"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export default function SignupPage() {
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
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // The AuthProvider will handle the redirect on successful signup
    } catch (error: any) {
      let errorMessage = "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Cette adresse e-mail est déjà utilisée.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "L'adresse e-mail n'est pas valide.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Le mot de passe est trop faible.";
      }
      toast({
        title: "Erreur d'Inscription",
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
        <title>Inscription | Méthode Esther</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-transparent p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold text-primary">
              Créer un compte
            </CardTitle>
            <CardDescription>Inscrivez-vous pour accéder à l'espace membres.</CardDescription>
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
                      <FormLabel>Mot de passe</FormLabel>
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
                  S'inscrire
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
                <Link href="/login" className="text-sm text-primary hover:underline">
                    Vous avez déjà un compte ? Se connecter
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
