import React from 'react';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Props = {
    co2: number | null;
    temperature: number | null;
    humidity: number | null;
}

export default function DisplayMessage({ co2, temperature, humidity }: Props) {
    let message = "";
    let backgroundColor = "";
    let infoMessage = "";

    const co2Status = co2
    ? co2 > 1200
        ? "danger"
        : co2 > 800
        ? "warning"
        : "normal"
    : "unknown";

    const tempStatus = temperature
    ? temperature < 18 || temperature > 30
        ? "danger"
        : (temperature >= 18 && temperature <= 19) || (temperature >= 27 && temperature <= 30)
        ? "warning"
        : "normal"
    : "unknown";

    const humidityStatus = humidity
    ? humidity < 30 || humidity > 70
        ? "danger"
        : (humidity >= 30 && humidity <= 39) || (humidity >= 61 && humidity <= 70)
        ? "warning"
        : "normal"
    : "unknown";

    // Calculer la priorité (Rouge > Orange > Vert)
    if ([co2Status, tempStatus, humidityStatus].includes("danger")) {
        backgroundColor = "bg-red-200 text-red-500";
        message = "Danger détecté : Prenez immédiatement des mesures.";
        if (co2 && co2 > 1200) {
        message = "Niveau critique de CO2 détecté. Aérez immédiatement la pièce.";
        infoMessage = "Le dioxyde de carbone (CO2) est un gaz incolore et inodore. Une concentration élevée peut entraîner des maux de tête, des vertiges, des nausées et des vomissements.";
        } else if (temperature && (temperature < 18 || temperature > 30)) {
        message = "Température critique détectée. Ajustez les conditions.";
        infoMessage = "La température ambiante idéale se situe entre 18 et 30 degrés Celsius.";
        } else if (humidity && (humidity < 30 || humidity > 70)) {
        message = "Humidité critique détectée. Vérifiez la ventilation.";
        infoMessage = "Le taux d'humidité idéal se situe entre 30 et 70%. Un taux trop bas peut entraîner une irritation des yeux et des voies respiratoires, tandis qu'un taux trop élevé peut favoriser la croissance de moisissures.";
        }
    } 
    else if ([co2Status, tempStatus, humidityStatus].includes("warning")) {
        backgroundColor = "bg-orange-200 text-orange-500";
        message = "Attention : Surveillez les conditions.";
        if (co2 && co2 >= 801 && co2 <= 1200) {
        message = "Concentration élevée de CO2 détectée. Aérez la pièce.";
        infoMessage = "Le dioxyde de carbone (CO2) est un gaz incolore et inodore. Une concentration élevée peut entraîner des maux de tête, des vertiges, des nausées et des vomissements.";
        } else if (temperature && ((temperature >= 18 && temperature <= 19) || (temperature >= 27 && temperature <= 30))) {
        message = "Température légèrement inconfortable. Ajustez si nécessaire.";
        infoMessage = "Se sentir trop chaud ou trop froid peut affecter la concentration et le bien-être.";
        } else if (humidity && ((humidity >= 30 && humidity <= 39) || (humidity >= 61 && humidity <= 70))) {
        message = "Humidité légèrement hors normes. Prenez des mesures.";
        infoMessage = "Un taux d'humidité légèrement élevé peut favoriser la croissance de moisissures, tandis qu'un taux légèrement bas peut entraîner une irritation des yeux et des voies respiratoires.";
        }
    } 
    else if (co2Status === "normal" && tempStatus === "normal" && humidityStatus === "normal") {
        backgroundColor = "bg-green-200 text-green-500";
        message = "Tout va bien. Conditions optimales détectées.";
        infoMessage = "Les conditions actuelles sont optimales pour le confort et la productivité.";
    } 
    else {
        backgroundColor = "bg-gray-400";
        message = "Données insuffisantes pour évaluer les conditions.";
        infoMessage = "Veuillez vérifier les capteurs et les connexions.";
    }

  return (
    <div className={`flex justify-between p-4 rounded ${backgroundColor}`}>
        <p className="font-semibold">{message}</p>
        <Popover>
            <PopoverTrigger>
                <Info className="w-5 h-5" />
            </PopoverTrigger>
            <PopoverContent>
                <p className="text-sm">{infoMessage}</p>
            </PopoverContent>
        </Popover>
    </div>
  )
}