"use client";

import { useMemo, useState } from "react";

const VILLES = [
  { nom: "Paris", lat: 48.8566, lon: 2.3522 },
  { nom: "Lyon", lat: 45.764, lon: 4.8357 },
  { nom: "Marseille", lat: 43.2965, lon: 5.3698 },
  { nom: "Bordeaux", lat: 44.8378, lon: -0.5792 },
  { nom: "Lille", lat: 50.6292, lon: 3.0573 },
  { nom: "Toulouse", lat: 43.6047, lon: 1.4442 },
  { nom: "Nice", lat: 43.7102, lon: 7.262 },
  { nom: "Nantes", lat: 47.2184, lon: -1.5536 },
  { nom: "Strasbourg", lat: 48.5734, lon: 7.7521 },
  { nom: "Londres", lat: 51.5072, lon: -0.1276 },
  { nom: "Bruxelles", lat: 50.8503, lon: 4.3517 },
  { nom: "Amsterdam", lat: 52.3676, lon: 4.9041 },
  { nom: "Berlin", lat: 52.52, lon: 13.405 },
  { nom: "Genève", lat: 46.2044, lon: 6.1432 },
  { nom: "Madrid", lat: 40.4168, lon: -3.7038 },
  { nom: "Barcelone", lat: 41.3874, lon: 2.1686 },
  { nom: "Lisbonne", lat: 38.7223, lon: -9.1393 },
  { nom: "Rome", lat: 41.9028, lon: 12.4964 },
  { nom: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { nom: "Casablanca", lat: 33.5731, lon: -7.5898 },
  { nom: "Marrakech", lat: 31.6295, lon: -7.9811 },
  { nom: "Alger", lat: 36.7538, lon: 3.0588 },
  { nom: "Tunis", lat: 36.8065, lon: 10.1815 },
  { nom: "Le Caire", lat: 30.0444, lon: 31.2357 },
  { nom: "Dakar", lat: 14.7167, lon: -17.4677 },
  { nom: "Abidjan", lat: 5.36, lon: -4.0083 },
  { nom: "Dubaï", lat: 25.2048, lon: 55.2708 },
  { nom: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { nom: "Singapour", lat: 1.3521, lon: 103.8198 },
  { nom: "Pékin", lat: 39.9042, lon: 116.4074 },
  { nom: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { nom: "Sydney", lat: -33.8688, lon: 151.2093 },
  { nom: "New York", lat: 40.7128, lon: -74.006 },
  { nom: "Montréal", lat: 45.5017, lon: -73.5673 },
  { nom: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { nom: "Mexico", lat: 19.4326, lon: -99.1332 },
  { nom: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { nom: "Fort-de-France", lat: 14.6161, lon: -61.0588 },
  { nom: "Saint-Denis (La Réunion)", lat: -20.8789, lon: 55.4481 },
];

const RAYON_TERRE_KM = 6371;
const KM_PAR_MILE = 1.609344;
const VITESSE_AVION_KMH = 800;

function distanceKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
): number {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * RAYON_TERRE_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function formatDuree(heures: number): string {
  const totalMinutes = Math.round(heures * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  return `${h} h ${m.toString().padStart(2, "0")}`;
}

export default function DistanceVilles() {
  const [depart, setDepart] = useState("Paris");
  const [arrivee, setArrivee] = useState("New York");

  const result = useMemo(() => {
    const a = VILLES.find((v) => v.nom === depart);
    const b = VILLES.find((v) => v.nom === arrivee);
    if (!a || !b) return null;
    const km = distanceKm(a, b);
    return { km, miles: km / KM_PAR_MILE, duree: km / VITESSE_AVION_KMH };
  }, [depart, arrivee]);

  const nombre = (v: number) => Math.round(v).toLocaleString("fr-FR");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="villeDepart">
            Ville de départ
          </label>
          <select
            id="villeDepart"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="input"
          >
            {VILLES.map((v) => (
              <option key={v.nom} value={v.nom}>
                {v.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="villeArrivee">
            Ville d&apos;arrivée
          </label>
          <select
            id="villeArrivee"
            value={arrivee}
            onChange={(e) => setArrivee(e.target.value)}
            className="input"
          >
            {VILLES.map((v) => (
              <option key={v.nom} value={v.nom}>
                {v.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Distance à vol d&apos;oiseau
          </p>
          <p className="text-3xl font-bold text-signal">
            {result ? `${nombre(result.km)} km` : "—"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">En miles</p>
            <p className="text-lg font-semibold text-white">
              {result ? `${nombre(result.miles)} mi` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Vol estimé</p>
            <p className="text-lg font-semibold text-white">
              {result ? formatDuree(result.duree) : "—"}
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 pt-4 text-sm text-white/60">
          La durée de vol est une estimation à 800 km/h, hors escales et temps d&apos;embarquement.
        </p>
      </div>
    </div>
  );
}
