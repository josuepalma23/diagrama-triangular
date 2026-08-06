import { useState } from 'react';

// 1. Declaración de interfaces para TypeScript
interface Elemento {
  id: string;
  texto: string;
  nivel?: number;
}

interface SeccionData {
  titulo: string;
  color: string;
  elementos: Elemento[];
}

interface DatosEstructura {
  [key: string]: SeccionData;
}

// 2. Estructura de datos
const datosEstructura: DatosEstructura = {
  modernidad: {
    titulo: "I. Modernidad",
    color: "#D1D5DB",
    elementos: [
      { id: "1.", texto: "Ilustración" },
      { id: "2.", texto: "Globalización" },
      { id: "2.1.", texto: "Colonialismo y postcolonialismo", nivel: 1 },
      { id: "3.", texto: "La neorreacción" },
      { id: "4.", texto: "El giro ontológico en la antropología" }
    ]
  },
  tecnica: {
    titulo: "II. Técnica",
    color: "#D1D5DB",
    elementos: [
      { id: "1.", texto: "Técnica como concepto antropológico" },
      { id: "1.1.", texto: "Tendencia técnica y hecho técnico", nivel: 1 },
      { id: "1.2.", texto: "La tecnicidad", nivel: 1 },
      { id: "2.", texto: "Técnica como concepto político" },
      { id: "2.1.", texto: "La perspectiva de la antigüedad y el medioevo", nivel: 1 },
      { id: "2.2.", texto: "El pensamiento moderno", nivel: 1 },
      { id: "2.3.", texto: "Antropoceno", nivel: 1 }
    ]
  },
  cosmos: {
    titulo: "III. Cosmos",
    color: "#D1D5DB",
    elementos: [
      { id: "1.", texto: "El cosmos en el pensamiento antiguo y en el medioevo" },
      { id: "2.", texto: "El cosmos en el pensamiento moderno (I): Alexandre Koyré" },
      { id: "3.", texto: "El cosmos en el pensamiento moderno (II): Rémi Brague" },
      { id: "4.", texto: "Howard Caygill y el concepto de cosmos en Kant" },
      { id: "5.", texto: "Isabelle Stengers: cosmopolítica y ecología de las prácticas" }
    ]
  }
};

export default function DiagramaTrianguloInteractvo() {
  // 3. Tipado de estados
  const [seccionActiva, setSeccionActiva] = useState<string | null>(null);
  const [pantallaCompleta, setPantallaCompleta] = useState<boolean>(false);

  // 4. Tipado de funciones
  const handleClick = (seccion: string) => {
    setSeccionActiva(seccion);
    setPantallaCompleta(true);
  };

  const handleReset = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pantallaCompleta && e.target === e.currentTarget) {
      setPantallaCompleta(false);
      setTimeout(() => {
        setSeccionActiva(null);
      }, 500);
    }
  };

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out font-serif ${pantallaCompleta ? '' : 'bg-white'}`}
      onClick={handleReset}
      style={{ 
        fontFamily: 'Times New Roman, serif',
        backgroundColor: pantallaCompleta && seccionActiva ? datosEstructura[seccionActiva].color : 'white',
        touchAction: 'none'
      }}
    >
      <div 
        className={`flex flex-col items-center justify-start lg:justify-center w-full max-w-[1800px] h-full px-4 lg:px-8 transition-all duration-700 ease-in-out pt-10 pb-4 lg:pt-6 lg:pb-6 ${pantallaCompleta ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}
      >
        
        {/* TÍTULO PRINCIPAL (mb-6 en móvil para separar el diagrama del texto) */}
        <h1 className="text-2xl lg:text-5xl font-bold text-center text-black mb-6 lg:mb-12 tracking-wide flex-shrink-0 mt-2 lg:mt-0" style={{ fontFamily: 'Times New Roman, serif' }}>
          Esquema del Marco teórico
        </h1>

        <div className="flex flex-col items-center justify-start lg:justify-center w-full flex-grow">
          
          {/* DIAGRAMA TRIANGULAR (Se quitó el margen negativo para evitar la superposición) */}
          <div className="w-full flex items-start lg:items-center justify-center relative flex-grow mt-2 lg:mt-0">
            <svg 
              viewBox="0 0 1000 800" 
              className="w-full max-w-[95vw] lg:max-w-[1200px] max-h-[65vh] lg:max-h-[85vh] drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="hover-bright" x="-20%" y="-20%" width="140%" height="140%">
                   <feComponentTransfer>
                      <feFuncR type="linear" slope="1.05"/>
                      <feFuncG type="linear" slope="1.05"/>
                      <feFuncB type="linear" slope="1.05"/>
                    </feComponentTransfer>
                </filter>
              </defs>

              {/* Triángulo principal */}
              <polygon 
                points="500,150 150,700 850,700" 
                fill="none" 
                stroke="black" 
                strokeWidth="10" 
              />

              {/* Vértice Superior: Modernidad */}
              <g 
                className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
                onClick={(e) => { e.stopPropagation(); handleClick('modernidad'); }}
              >
                 <circle cx="500" cy="150" r="40" fill={datosEstructura.modernidad.color} stroke="black" strokeWidth="3" />
                 {/* Texto Arriba */}
                 <text x="500" y="80" textAnchor="middle" fontSize="36" fill="black" fontWeight="normal" fontFamily="Times New Roman, serif">Modernidad</text>
                 {/* Indicador + */}
                 <text x="500" y="158" textAnchor="middle" fontSize="24" fontWeight="bold" fill="black">+</text>
              </g>

              {/* Vértice Inferior Izquierdo: Técnica */}
              <g 
                className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
                onClick={(e) => { e.stopPropagation(); handleClick('tecnica'); }}
              >
                 <circle cx="150" cy="700" r="40" fill={datosEstructura.tecnica.color} stroke="black" strokeWidth="3" />
                 {/* Texto Izquierda */}
                 <text x="90" y="710" textAnchor="end" fontSize="36" fill="black" fontWeight="normal" fontFamily="Times New Roman, serif">Técnica</text>
                 {/* Indicador + */}
                 <text x="150" y="708" textAnchor="middle" fontSize="24" fontWeight="bold" fill="black">+</text>
              </g>

              {/* Vértice Inferior Derecho: Cosmos */}
              <g 
                className="cursor-pointer transition-all duration-200 hover:filter-[url(#hover-bright)]"
                onClick={(e) => { e.stopPropagation(); handleClick('cosmos'); }}
              >
                 <circle cx="850" cy="700" r="40" fill={datosEstructura.cosmos.color} stroke="black" strokeWidth="3" />
                 {/* Texto Derecha */}
                 <text x="910" y="710" textAnchor="start" fontSize="36" fill="black" fontWeight="normal" fontFamily="Times New Roman, serif">Cosmos</text>
                 {/* Indicador + */}
                 <text x="850" y="708" textAnchor="middle" fontSize="24" fontWeight="bold" fill="black">+</text>
              </g>

              {/* Texto Central */}
              <g>
                 <text x="500" y="450" textAnchor="middle" fontSize="32" fill="black" fontFamily="Times New Roman, serif">Teoría política de las</text>
                 <text x="500" y="495" textAnchor="middle" fontSize="32" fill="black" fontFamily="Times New Roman, serif">tecnodiversidades</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* PANTALLA COMPLETA AL HACER CLICK */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 lg:p-8 transition-all duration-700 ease-in-out overflow-y-auto ${pantallaCompleta ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-110 pointer-events-none'}`}
        onClick={handleReset}
      >
        <button 
          onClick={() => setPantallaCompleta(false)}
          className="fixed top-6 right-6 z-50 text-gray-800 hover:text-black font-bold text-lg lg:text-2xl hover:scale-110 transition-transform flex items-center gap-2 lg:gap-3 bg-white/90 hover:bg-white px-4 py-2.5 lg:px-6 lg:py-4 rounded-full shadow-2xl border-2 border-black/20 backdrop-blur-md cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Cerrar
        </button>

        {seccionActiva && datosEstructura[seccionActiva] && (
          <div 
            className="w-full max-w-5xl p-6 lg:p-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border-4 border-black/10 cursor-default text-center my-auto"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-4xl lg:text-7xl font-bold mb-6 lg:mb-12 text-gray-900 border-b-4 border-black/20 pb-6 inline-block" style={{ fontFamily: 'Times New Roman, serif' }}>
              {datosEstructura[seccionActiva].titulo}
            </h2>
            
            {datosEstructura[seccionActiva].elementos.length > 0 && (
              <div className="w-full mx-auto text-left pl-2 lg:pl-10">
                {datosEstructura[seccionActiva].elementos.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start group mb-4 lg:mb-6 ${item.nivel ? 'ml-8 lg:ml-16' : ''}`}
                  >
                    <span className="text-xl lg:text-3xl font-bold mr-4 text-gray-800 min-w-[40px]" style={{ fontFamily: 'Times New Roman, serif' }}>
                      {item.id}
                    </span>
                    <span className="text-xl lg:text-3xl text-gray-900 leading-tight group-hover:text-black transition-colors" style={{ fontFamily: 'Times New Roman, serif' }}>
                      {item.texto}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
