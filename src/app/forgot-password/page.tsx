"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setEmailSent(true);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'e-mail de réinitialisation du mot de passe. Veuillez vérifier l'adresse e-mail et réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Mot de passe oublié | Méthode Esther</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold text-primary">
              Réinitialiser le mot de passe
            </CardTitle>
            <CardDescription>
              {emailSent
                ? "Nous vous avons envoyé un e-mail pour réinitialiser votre mot de passe."
                : "Entrez votre email et nous vous enverrons un lien pour le réinitialiser."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center">
                <p className="mb-4">
                  Si vous ne le trouvez pas, vérifiez votre dossier de courrier indésirable.
                </p>
                <Link href="/login">
                  <Button className="w-full">Retour à la connexion</Button>
                </Link>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse e-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="votreadresse@exemple.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Envoyer l'e-mail
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center">
                  <Link
                    href="/login"
                    className="text-sm text-primary hover:underline"
                  >
                    Retour à la connexion
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          <p>Méthode Esther © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
