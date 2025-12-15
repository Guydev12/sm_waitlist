import { useState } from "react";
import { Users, Calendar, MessageCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Participant {
  id: string;
  fullName: string;
  whatsappNumber: string;
  registeredAt: Date;
}

export function WaitlistForm() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !whatsappNumber.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const newParticipant = {
      fullName: fullName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      registeredAt: new Date().toISOString(),
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbz7ptoZPCzrKNd7XiKj2-YgmQngqfdofEg5HalyYKwXiWf6pfxJuda5y_MVJY40oVCGXg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParticipant),
        }
      );
    } catch (err) {
      toast.error("Erreur lors de l'inscription.");
      return;
    }

    // Update UI locally
    setParticipants((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...newParticipant,
        registeredAt: new Date(),
      },
    ]);

    setFullName("");
    setWhatsappNumber("");

    toast.success("Inscription réussie !");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center space-y-4">
          <h1 className="text-indigo-600 font-bold text-2xl">
            Salon de Motivation
          </h1>
          <div className="inline-block bg-indigo-100 text-indigo-800 px-6 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Événement à venir</span>
            </div>
          </div>
          <h2 className="text-indigo-800">
            Conférence-débat sur la délinquance juvénile
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rejoignez-nous pour une discussion importante sur les enjeux de la
            délinquance juvénile et les solutions pour notre communauté.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h3 className="text-indigo-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600 font-semibold" />
            Inscription à la liste d&apos;attente
          </h3>
          <p className="text-gray-600 mt-2">
            Inscrivez-vous pour réserver votre place à cet événement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
              placeholder="Entrez votre nom complet"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-gray-700 mb-2">
              Numéro WhatsApp
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
                placeholder="+509 30006789 "
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            S&apos;inscrire
          </button>
        </form>
      </div>

      {/* Participants List */}
      {participants.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-gray-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-600" />
              Participants inscrits ({participants.length})
            </h3>
          </div>

          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="text-gray-800">{participant.fullName}</p>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{participant.whatsappNumber}</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  {participant.registeredAt.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
