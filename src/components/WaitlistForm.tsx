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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !whatsappNumber.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    } else if (whatsappNumber.length < 8) {
      toast.error("Numero invalid");
      return;
    }

    const participant: Participant = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      registeredAt: new Date(),
    };

    try {
      setLoading(true);

      // ⚠️ no-cors = no response visibility (Google Apps Script limitation)
      await fetch(
        "https://script.google.com/macros/s/AKfycbz7ptoZPCzrKNd7XiKj2-YgmQngqfdofEg5HalyYKwXiWf6pfxJuda5y_MVJY40oVCGXg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: participant.fullName,
            whatsappNumber: participant.whatsappNumber,
            registeredAt: participant.registeredAt.toISOString(),
          }),
        }
      );
      participants.map((pat) => {
        console.log(pat.id);
      });
      // Update UI optimistically
      setParticipants((prev) => [...prev, participant]);

      setFullName("");
      setWhatsappNumber("");

      toast.success("Inscription réussie !");
    } catch (error) {
      toast.error("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
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
          <h3 className="text-indigo-800 flex items-center gap-2 font-semibold">
            <Users className="w-6 h-6 text-indigo-600" />
            Inscription à la liste d&apos;attente
          </h3>
          <p className="text-gray-600 mt-2">
            Inscrivez-vous pour réserver votre place à cet événement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700"
              placeholder="Entrez votre nom complet"
            />
          </div>

          {/* WhatsApp */}
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700"
                placeholder="+509 3000 6789"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <CheckCircle className="w-5 h-5" />
            {loading ? "Envoi..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
