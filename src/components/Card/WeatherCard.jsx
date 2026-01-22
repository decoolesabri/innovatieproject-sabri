import { useState, useEffect } from "react";
import BaseCard from "./BaseCard";
import weatherData from "../../data/weatherMock.json";

const weatherStyles = { // Deze staat buiten de component omdat het vast staat
    Zonnig: "bg-yellow-50",
    Bewolkt: "bg-gray-50",
    Regen: "bg-blue-50",
    Sneeuw: "bg-slate-50",
    Halfbewolkt: "bg-gray-100",
    Onweer: "bg-purple-50",
    Mist: "bg-white/30"
};

export default function WeatherCard({ onDelete }) {
    const storageKey = "weather-card";
    
    const [weather, setWeather] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : weatherData[0];
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(weather));
    }, [weather]);


    return (
        <BaseCard title="Weer" onDelete={onDelete}>
            <div
                className={`space-y-3 text-sm p-3 rounded-lg ${
                    weatherStyles[weather.condition] ?? "bg-white" // Gebruik de linkerwaarde als die bestaat, anders gebruik de rechterwaarde
                }`}
            >

                <select
                    value={weather.city}
                    onChange={(e) => {
                        const selectedCity = e.target.value;
                        const selectedWeather = weatherData.find(
                            (w) => w.city === selectedCity
                        );
                        setWeather(selectedWeather);
                    }}
                    className="w-full p-2 border rounded text-sm"
                >
                    {weatherData.map((w) => (
                        <option key={w.city} value={w.city}>
                            {w.city}
                        </option>
                    ))}
                </select>

                <div className="text-lg font-semibold">
                    {weather.city}
                </div>

                <div className="text-3xl font-bold">
                    {weather.temperature}°C
                </div>

                <div className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700">
                    {weather.condition}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="px-3 py-2 rounded-md bg-gray-100 text-gray-700">
                        <div className="text-xs text-gray-500">Luchtvochtigheid</div>
                        <div className="font-medium">{weather.humidity}%</div>
                    </div>

                    <div className="px-3 py-2 rounded-md bg-gray-100 text-gray-700">
                        <div className="text-xs text-gray-500">Wind</div>
                        <div className="font-medium">{weather.wind} m/s</div>
                    </div>
                </div>

            </div>
        </BaseCard>
    );
}