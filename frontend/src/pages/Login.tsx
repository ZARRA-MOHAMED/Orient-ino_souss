
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Simuler une connexion réussie
      console.log("Login data:", data);
      toast.success("Connexion réussie");
      navigate("/diagnostics");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Se connecter</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exemple@email.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
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
                          placeholder="••••••••"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Se souvenir de moi
                        </label>
                      </div>
                    )}
                  />
                  <Link to="/forgot-password" className="text-sm text-orientpro-blue hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <Link to="/register" className="text-orientpro-blue hover:underline font-medium">
                S'inscrire
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
