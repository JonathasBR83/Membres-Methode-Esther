"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(1, { message: "Le mot de passe ne peut pas être vide." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // The AuthProvider will handle the redirect on successful login
    } catch (error: any) {
      let errorMessage = "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        errorMessage = "Adresse e-mail ou mot de passe invalide.";
      }
      toast({
        title: "Erreur de Connexion",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Connexion | Méthode Esther</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-transparent p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Image
                src="https://i.imgur.com/1XCSdWk.png"
                alt="Logo Méthode Esther"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <CardTitle className="font-headline text-3xl font-bold text-primary">
              Espace Membres
            </CardTitle>
            <CardDescription>Ravi de vous revoir !</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex items-center justify-between">
                        <FormLabel>Mot de passe</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Se connecter
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
              <Link href="/signup" className="block">
                <Button
                  type="button"
                  className="w-full bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Inscrivez-vous ici
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <footer className="mt-8 text-center text-sm text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          <p>Méthode Esther © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
