"use client";

import { useState } from 'react';

const perguntas = [
  "Ich fühle mich traurig oder niedergeschlagen, selbst ohne klaren oder spezifischen Grund.",
  "Ich bemerke, dass ich das Interesse oder die Freude an Aktivitäten verloren habe, die mir früher Spaß gemacht haben.",
  "Ich habe Schwierigkeiten, morgens aufzustehen oder alltägliche Aufgaben aufgrund von Antriebslosigkeit oder innerer Leere zu beginnen.",
  "Ich fühle mich häufig hoffnungslos, pessimistisch oder glaube, dass mein Leben keinen Sinn hat.",
  "Mein Appetit und/oder Schlafmuster hat sich ohne ersichtlichen Grund erheblich verändert (mehr oder weniger als üblich).",
  "Ich hatte in letzter Zeit Gedanken an Tod, Suizid oder den Wunsch zu verschwinden, um meinem emotionalen Schmerz zu entkommen.", // FLAG
  "Ich habe Schwierigkeiten, meine Aufmerksamkeit oder Konzentration aufrechtzuerhalten und fühle mich oft abwesend oder unaufmerksam.",
  "Der Umgang mit anderen Menschen ist schwierig oder belastend geworden, und ich ziehe mich zunehmend zurück.",
  "Ich weine häufig oder habe starken Drang zu weinen, ohne konkreten Anlass.",
  "Ich habe ein dauerhaftes Schuldgefühl oder fühle mich wertlos und glaube, dass ich Menschen in meiner Umgebung enttäusche."
];

export default function TesteDepressao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Depressionstest</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Geben Sie an, wie häufig jede Situation derzeit auf Sie zutrifft:<br />
              <strong>(1) Nie | (2) Selten | (3) Manchmal | (4) Häufig | (5) Immer</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${corGradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Resultado: {resultado}</h2>
          <img
            src={
              resultado === "GRÜN"
                ? "/images/semaforo-verde.png"
                : resultado === "GELB"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Indicador ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "GRÜN" && (
            <p className="text-center">Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>
          )}
          {resultado === "GELB" && (
            <p className="text-center">Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>
          )}
          {resultado === "ROT" && (
            <p className="text-center">Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
    
        </>
      )}
    </div>
  );
}
