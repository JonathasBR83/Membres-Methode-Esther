"use client";

import { signOut } from "firebase/auth";
import { BookOpen, LogOut, Star, Expand, Minimize, Mail } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader as DialogHeaderPrimitive,
  DialogTitle,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MembersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The AuthProvider will handle the redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch((err) => {
        alert(
          `Erreur lors de la tentative d'activation du mode plein écran: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleFullscreenBonus = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch((err) => {
        alert(
          `Erreur lors de la tentative d'activation du mode plein écran: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Bienvenue | Méthode Esther</title>
      </Head>
      <div className="min-h-screen">
        <header className="flex items-center justify-between border-b bg-card/80 backdrop-blur-sm p-4 shadow-sm sticky top-0 z-10">
          <h1 className="font-headline text-xl font-bold text-primary md:text-2xl">
            Méthode Esther
          </h1>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user?.email}
            </span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </header>

        <main className="container mx-auto p-4 py-8 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-white md:text-4xl">
              Bienvenue, Femme de Dieu !
            </h1>
            <p className="mt-2 text-lg text-gray-200">
              Explorez le contenu exclusif que nous avons préparé pour vous.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card/90 backdrop-blur-md overflow-hidden">
               <CardHeader className="p-0">
                <Image src="https://i.imgur.com/1XCSdWk.png" alt="Méthode Esther" width={500} height={300} className="w-full h-auto object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                 <CardTitle className="font-headline text-2xl text-foreground mb-2">
                  Méthode Esther
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  Plongez dans les enseignements et transformez votre parcours. C'est votre guide principal pour une vie avec plus de but et de foi.
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Accéder ici</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeaderPrimitive className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>La Méthode Esther</DialogTitle>
                        <DialogDescriptionPrimitive>
                          Votre guide pour une vie avec plus de but et de foi.
                        </DialogDescriptionPrimitive>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        aria-label="Plein écran"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeaderPrimitive>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/MetodoEsther.html"
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Méthode Esther"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card/90 backdrop-blur-md overflow-hidden">
              <CardHeader className="p-0">
                 <Image src="https://i.imgur.com/M16agGT.png" alt="Guide de Préparation de Sermons" width={500} height={300} className="w-full h-auto object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl text-foreground mb-2">
                  Guide de Préparation de Sermons
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  Une ressource pratique et spirituelle qui vous guide pas à pas pour structurer des prédications claires, puissantes et pleines d'onction, en évitant les blocages et en gagnant en confiance à chaque prise de parole.
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Accéder ici</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeaderPrimitive className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>Guide de Préparation de Sermons</DialogTitle>
                        <DialogDescriptionPrimitive>
                          Matériel supplémentaire pour approfondir votre préparation ministérielle.
                        </DialogDescriptionPrimitive>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreenBonus}
                        aria-label="Plein écran"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeaderPrimitive>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/GPSermones.html"
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Guide de Préparation de Sermons.html"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card/90 backdrop-blur-md overflow-hidden">
                <CardHeader className="p-0">
                  <Image src="https://i.imgur.com/eS2annu.png" alt="Les 7 Étapes inspirées d'Esther" width={500} height={300} className="w-full h-auto object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl text-foreground mb-2">
                  Les 7 Étapes inspirées d'Esther
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  Une liste rapide avec les 7 étapes inspirées d'Esther qui vous prépare quelques minutes avant de prêcher, vous aidant à calmer vos nerfs, à concentrer votre esprit et à monter en chaire avec une autorité divine.
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Accéder ici</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeaderPrimitive className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>Les 7 Étapes inspirées d'Esther</DialogTitle>
                        <DialogDescriptionPrimitive>
                          Les 7 étapes d'Esther pour monter en chaire avec paix et autorité.
                        </DialogDescriptionPrimitive>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreenBonus}
                        aria-label="Plein écran"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeaderPrimitive>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/Los7Pasos.html"
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Les 7 Étapes inspirées d'Esther"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card/90 backdrop-blur-md overflow-hidden">
              <CardHeader className="p-0">
                  <Image src="https://i.imgur.com/m6Lonzg.png" alt="Plan de Développement du Leadership Ministériel" width={500} height={300} className="w-full h-auto object-cover" data-ai-hint="leadership book" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl text-foreground mb-2">
                  Plan de Développement du Leadership Ministériel
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  Un plan stratégique pour cultiver et renforcer vos compétences de leadership au sein du ministère, vous guidant pour devenir une leader influente et efficace.
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Accéder ici</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeaderPrimitive className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>Plan de Développement du Leadership Ministériel</DialogTitle>
                        <DialogDescriptionPrimitive>
                          Renforcez vos compétences de leadership dans le ministère.
                        </DialogDescriptionPrimitive>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreenBonus}
                        aria-label="Plein écran"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeaderPrimitive>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/Plan de Desarrollo.html"
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Plan de Desarrollo"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Alert className="bg-card/80 backdrop-blur-md border-border/50 text-foreground">
              <AlertTitle className="flex items-center gap-2 font-bold text-base">📢 Important :</AlertTitle>
              <AlertDescription className="text-sm">
                <p className="mt-2">
                  Si vous rencontrez un problème technique ou des difficultés pour accéder ou utiliser le contenu du cours, veuillez nous en informer immédiatement. Notre équipe de support est prête à vous aider et à résoudre votre situation le plus rapidement possible.
                </p>
                <p className="mt-4 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <strong className="text-foreground">Soutien :</strong>
                  <a href="mailto:apoyo@infodigitalexpress.shop" className="text-foreground hover:underline">
                    support@infodigitalexpress.shop
                  </a>
                </p>
                <p className="mt-4">
                  Votre satisfaction et votre expérience sont notre priorité. 💜
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    </>
  );
}
