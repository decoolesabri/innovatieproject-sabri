import { useState } from "react";
import BaseCard from "./BaseCard";
import weatherData from "../../data/weatherMock.json";

export default function WeatherCard({ onDelete }) {
    const [weather, setWeather] = useState(weatherData[0]);

    return (
        <BaseCard title="Weer" onDelete={onDelete}>
            <div className="space-y-3 text-sm">

                <div className="text-lg font-semibold">
                    {weather.city}
                </div>

                <div className="text-3xl font-bold">
                    {weather.temperature}°C
                </div>

                <div className="text-gray-600">
                    {weather.condition}
                </div>

                <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <div>💧 Luchtvochtigheid: {weather.humidity}%</div>
                    <div>🌬️ Wind: {weather.wind} m/s</div>
                </div>

            </div>
        </BaseCard>
    );
}