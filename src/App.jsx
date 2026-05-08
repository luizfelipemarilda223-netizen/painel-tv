export default function PainelFilaAtendimento() {
  const espera = [
"joão","pedro","felipe","kaio"
  ];

  const liberados = [ 
    "Luiz","jose"
    
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #0f172a, #172554, #020617)",
      color: "white",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      
      {/* Header */}
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
            PAINEL DE ATENDIMENTO
          </h1>

          <p style={{ color: "#cbd5e1" }}>
            Sistema de chamada de clientes
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

      {/* Conteúdo */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "20px"
      }}>

        {/* Espera */}
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

        {/* Chamando */}
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
            Aguardando
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
            Carregamento
          </div>

          <div style={{
            marginTop: "30px",
            fontSize: "24px",
            color: "#cbd5e1"
          }}>
            Dirija-se ao atendimento
          </div>
        </div>

        {/* Liberados */}
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

      {/* Rodapé */}
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
  );
}