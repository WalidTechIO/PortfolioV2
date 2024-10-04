import { Button } from "@/components/ui/button";
import { getContact } from "@/actions/api";
import { Github, Linkedin, Mail } from "lucide-react";

export default async function Contact() {

    const { mail, linkedin, location, github } = await getContact();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Me Contacter</h1>
            <p className="mb-4">Je suis toujours ouvert aux nouvelles opportunités et collaborations. N&apos;hésitez pas à me contacter !</p>
            <div className="space-y-4">
                <p><strong>Email :</strong> {mail}</p>
                <p><strong>Localisation :</strong> {location}</p>
            </div>
            <div className="mt-6 space-x-4">
                <Button asChild>
                    <a href={`mailto:${mail}`}>
                        <Mail className="mr-2 h-4 w-4" /> Contactez-moi maintenant !
                    </a>
                </Button>
                <Button asChild>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" /> Connectons-nous !
                    </a>
                </Button>
                <Button asChild>
                    <a href={github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Découvrez mes projets !
                    </a>
                </Button>
            </div>
            <p className="mt-6">Je vous répondrai dans les plus brefs délais. Merci de votre intérêt !</p>
        </div>
    );
}