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
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Ergebnis: {resultado}</h2>
          {resultado === "GRÜN" && <p>Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>}
          {resultado === "GELB" && <p>Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>}
          {resultado === "ROT" && <p>Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
        </>
      )}
    </div>
  );
}
