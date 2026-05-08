import { useEffect, useState } from "react";
import { ref, set, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA553QcbN69dY_fQfrjQ1S-AMM8CEuS_2U",
  authDomain: "painel-perfil-minas.firebaseapp.com",
  databaseURL: "https://painel-perfil-minas-default-rtdb.firebaseio.com",
  projectId: "painel-perfil-minas",
  storageBucket: "painel-perfil-minas.firebasestorage.app",
  messagingSenderId: "1036390447032",
  appId: "1:1036390447032:web:6f1e2a3a4693809517414d",
  measurementId: "G-025B0Y0G3S"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function PainelFilaAtendimento() {
  const [novoCliente, setNovoCliente] = useState("");
  const [espera, setEspera] = useState([]);
  const [liberados, setLiberados] = useState([]);
  const [chamando, setChamando] = useState("AGUARDANDO");

  useEffect(() => {
    const esperaRef = ref(db, "espera");
    const liberadosRef = ref(db, "liberados");
    const chamandoRef = ref(db, "chamando");

    onValue(esperaRef, (snapshot) => {
      const data = snapshot.val();
      setEspera(data ? Object.values(data) : []);
    });

    onValue(liberadosRef, (snapshot) => {
      const data = snapshot.val();
      setLiberados(data ? Object.values(data) : []);
    });

    onValue(chamandoRef, (snapshot) => {
      const data = snapshot.val();
      setChamando(data || "AGUARDANDO");
    });
  }, []);

  const adicionarEspera = () => {
  if (!novoCliente) return;
  push(ref(db, "espera"), novoCliente);
  setNovoCliente("");
};

const chamarCliente = () => {
  if (espera.length === 0) return;

  const cliente = espera[0];

  set(ref(db, "chamando"), cliente);
};

const liberarCliente = () => {
  if (!chamando || chamando === "AGUARDANDO") return;

  push(ref(db, "liberados"), chamando);
  set(ref(db, "chamando"), "AGUARDANDO");
};

return (
    <>
{window.location.pathname === "/admin" ? (
<div style={{
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "40px",
  fontFamily: "Arial"
}}>

<h1 style={{ fontSize: "42px", marginBottom: "30px" }}>
  Painel Administrativo
</h1>

<div style={{
  background: "rgba(255,255,255,0.08)",
  padding: "30px",
  borderRadius: "20px",
  maxWidth: "600px"
}}>

<input
  value={novoCliente}
  onChange={(e) => setNovoCliente(e.target.value)}
  placeholder="Nome do cliente"
  style={{
    width: "100%",
    padding: "18px",
    fontSize: "22px",
    borderRadius: "12px",
    border: "none",
    marginBottom: "20px"
  }}
/>

<div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>

<button
  onClick={adicionarEspera}
  style={{
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#eab308",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer"
  }}
>
  Adicionar Espera
</button>

<button
  onClick={chamarCliente}
  style={{
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer"
  }}
>
  Chamar Cliente
</button>

<button
  onClick={liberarCliente}
  style={{
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#22c55e",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer"
  }}
>
  Liberar Cliente
</button>

</div>
</div>
</div>
) : (
<div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #0f172a, #172554, #020617)",
      color: "white",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <div style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "42px", margin: 0 }}>
            PERFIL MINAS - ATENDIMENTO LOGÍSTICO
          </h1>

          <p style={{ color: "#cbd5e1" }}>
            Acompanhe seu carregamento em tempo real
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "38px", fontWeight: "bold" }}>
            {new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          <div style={{ color: "#cbd5e1" }}>
            {new Date().toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "20px"
      }}>

        <div style={{
          background: "rgba(234,179,8,0.1)",
          borderRadius: "20px",
          padding: "20px"
        }}>
          <h2 style={{
            color: "#fde047",
            marginBottom: "20px"
          }}>
            🟡 EM ESPERA
          </h2>

          {espera.map((cliente, index) => (
            <div key={index} style={{
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "10px",
              fontSize: "24px"
            }}>
              #{index + 1} - {cliente}
            </div>
          ))}
        </div>

        <div style={{
          background: "rgba(37,99,235,0.12)",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div style={{
            fontSize: "34px",
            color: "#93c5fd",
            marginBottom: "30px"
          }}>
            🔔 CHAMANDO AGORA
          </div>

          <div style={{
            fontSize: "90px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}>
            {chamando}
          </div>

          <div style={{
            background: "#22c55e",
            color: "black",
            padding: "20px",
            borderRadius: "999px",
            fontSize: "42px",
            fontWeight: "bold",
            width: "fit-content",
            margin: "0 auto"
          }}>
            CARREGAMENTO
          </div>
        </div>

        <div style={{
          background: "rgba(34,197,94,0.1)",
          borderRadius: "20px",
          padding: "20px"
        }}>
          <h2 style={{
            color: "#86efac",
            marginBottom: "20px"
          }}>
            🟢 LIBERADOS
          </h2>

          {liberados.map((cliente, index) => (
            <div key={index} style={{
              background: "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "10px",
              fontSize: "24px"
            }}>
              {cliente}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: "20px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>
          <div style={{
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            Bem-vindo à Perfil Minas
          </div>

          <div style={{
            color: "#cbd5e1"
          }}>
            Excelência em atendimento e carregamento
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: "20px"
        }}>
          <div style={{
            background: "rgba(59,130,246,0.2)",
            padding: "15px",
            borderRadius: "15px"
          }}>
            <div>Clientes em espera</div>
            <div style={{
              fontSize: "32px",
              fontWeight: "bold"
            }}>
              {espera.length}
            </div>
          </div>

          <div style={{
            background: "rgba(34,197,94,0.2)",
            padding: "15px",
            borderRadius: "15px"
          }}>
            <div>Atendidos hoje</div>
            <div style={{
              fontSize: "32px",
              fontWeight: "bold"
            }}>
              {liberados.length}
            </div>
          </div>
        </div>
      </div>
    </div>
)}
</>
  );
}
