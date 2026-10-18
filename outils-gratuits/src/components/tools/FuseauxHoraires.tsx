"use client";

import { useEffect, useMemo, useState } from "react";

const VILLES = [
  { nom: "Paris", zone: "Europe/Paris" },
  { nom: "Londres", zone: "Europe/London" },
  { nom: "Lisbonne", zone: "Europe/Lisbon" },
  { nom: "Istanbul", zone: "Europe/Istanbul" },
  { nom: "Moscou", zone: "Europe/Moscow" },
  { nom: "Casablanca", zone: "Africa/Casablanca" },
  { nom: "Alger", zone: "Africa/Algiers" },
  { nom: "Dakar", zone: "Africa/Dakar" },
  { nom: "Le Caire", zone: "Africa/Cairo" },
  { nom: "Dubaï", zone: "Asia/Dubai" },
  { nom: "New Delhi", zone: "Asia/Kolkata" },
  { nom: "Bangkok", zone: "Asia/Bangkok" },
  { nom: "Singapour", zone: "Asia/Singapore" },
  { nom: "Pékin", zone: "Asia/Shanghai" },
  { nom: "Tokyo", zone: "Asia/Tokyo" },
  { nom: "Sydney", zone: "Australia/Sydney" },
  { nom: "Auckland", zone: "Pacific/Auckland" },
  { nom: "Papeete", zone: "Pacific/Tahiti" },
  { nom: "Los Angeles", zone: "America/Los_Angeles" },
  { nom: "Mexico", zone: "America/Mexico_City" },
  { nom: "New York", zone: "America/New_York" },
  { nom: "Montréal", zone: "America/Toronto" },
  { nom: "Fort-de-France", zone: "America/Martinique" },
  { nom: "São Paulo", zone: "America/Sao_Paulo" },
  { nom: "Saint-Denis (La Réunion)", zone: "Indian/Reunion" },
];

/** Décalage (en ms) entre l'heure locale d'une zone et l'UTC à un instant donné. */
function offsetMs(zone: string, instant: number): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(new Date(instant))) p[part.type] = part.value;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUtc - Math.floor(instant / 1000) * 1000;
}

/** Convertit une date/heure locale "YYYY-MM-DDTHH:mm" d'une zone en instant UTC (ms). */
function localVersInstant(local: string, zone: string): number {
  const [d, t] = local.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [h, min] = t.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, day, h, min);
  const first = guess - offsetMs(zone, guess);
  return guess - offsetMs(zone, first);
}

/** Formate un instant en "YYYY-MM-DDTHH:mm" dans une zone donnée. */
function instantVersLocal(instant: number, zone: string): string {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(new Date(instant))) p[part.type] = part.value;
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

function formatAffichage(instant: number, zone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: zone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(instant));
}

function formatEcart(heures: number): string {
  if (heures === 0) return "même heure";
  const signe = heures > 0 ? "+" : "−";
  const valeur = Math.abs(heures).toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  return `${signe}${valeur} h`;
}

export default function FuseauxHoraires() {
  const [zoneSource, setZoneSource] = useState("Europe/Paris");
  const [local, setLocal] = useState("");

  useEffect(() => {
    setLocal(instantVersLocal(Date.now(), "Europe/Paris"));
  }, []);

  const lignes = useMemo(() => {
    if (!local) return [];
    const instant = localVersInstant(local, zoneSource);
    const offsetSource = offsetMs(zoneSource, instant);
    return VILLES.map((v) => ({
      ...v,
      heure: formatAffichage(instant, v.zone),
      ecart: (offsetMs(v.zone, instant) - offsetSource) / 3600000,
    }));
  }, [local, zoneSource]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="villeSource">
            Ville de départ
          </label>
          <select
            id="villeSource"
            value={zoneSource}
            onChange={(e) => setZoneSource(e.target.value)}
            className="input"
          >
            {VILLES.map((v) => (
              <option key={v.zone} value={v.zone}>
                {v.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="dateHeure">
            Date et heure sur place
          </label>
          <input
            id="dateHeure"
            type="datetime-local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="readout max-h-96 overflow-y-auto p-2">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-white/50">
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium">Date et heure</th>
              <th className="px-4 py-3 text-right font-medium">Écart</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => (
              <tr
                key={l.zone}
                className={
                  l.zone === zoneSource
                    ? "border-t border-white/10 text-signal"
                    : "border-t border-white/10 text-white"
                }
              >
                <td className="px-4 py-3 font-semibold">{l.nom}</td>
                <td className="px-4 py-3">{l.heure}</td>
                <td className="px-4 py-3 text-right">{formatEcart(l.ecart)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
