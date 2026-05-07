import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@finToken");

      if (storageUser) {
        try {
          const response = await api.get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          });
          api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;
          setUser(response.data);
        } catch (error) {
          setUser(null);
        }
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    try {
      await api.post("users/", {
        name: nome,
        password: password,
        email: email,
      });
      alert("Usuário Cadastrado com sucesso");
      router.back();
    } catch (err) {
      alert("Erro ao cadastrar: " + err.message);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      await AsyncStorage.setItem("@finToken", token);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({ id, name, email });
    } catch (err) {
      alert("Erro ao logar: " + err.message);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
