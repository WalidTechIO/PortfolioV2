"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface File {
  id: string;
  name: string;
}

interface FileListProps {
  initialFiles: File[];
}

export function FileList({ initialFiles }: FileListProps) {

  const [files, setFiles] = useState<File[]>(initialFiles);

  const handleDelete = async (name: string) => {
    try {
        const response = await fetch(`/api/files/${name}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erreur lors de la suppression du fichier");
        setFiles(files.filter(f => f.name !== name));
    } catch (error) {
        console.error("Erreur:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Liste des fichiers</CardTitle>
        <Button asChild><Link href="/admin/files/upload"><Plus className="mr-2" />Ajouter un fichier</Link></Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="flex justify-between items-center p-2 border rounded">
              <span>{file.name}</span>
              <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="text-red-500" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer le fichier {file.name} ?
                        Cette action est irréversible.
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={() => handleDelete(file.name)}>Supprimer</Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
