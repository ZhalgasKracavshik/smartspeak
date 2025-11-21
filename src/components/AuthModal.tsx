import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, AuthError } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { LogIn, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setIsOpen(false);
        } catch (err: any) {
            const firebaseError = err as AuthError;
            console.error("Google Sign-In error:", firebaseError);

            if (firebaseError.code === 'auth/popup-closed-by-user') {
                setError("Вход отменен");
            } else {
                setError("Ошибка входа через Google. Попробуйте позже.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            setIsOpen(false);
            setEmail("");
            setPassword("");
        } catch (err: any) {
            const firebaseError = err as AuthError;
            console.error("Auth error:", firebaseError);

            switch (firebaseError.code) {
                case 'auth/invalid-email':
                    setError("Некорректный email адрес");
                    break;
                case 'auth/user-disabled':
                    setError("Пользователь заблокирован");
                    break;
                case 'auth/user-not-found':
                    setError("Пользователь не найден");
                    break;
                case 'auth/wrong-password':
                    setError("Неверный пароль");
                    break;
                case 'auth/email-already-in-use':
                    setError("Email уже используется");
                    break;
                case 'auth/weak-password':
                    setError("Пароль слишком простой (минимум 6 символов)");
                    break;
                default:
                    setError("Произошла ошибка. Попробуйте позже.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <LogIn className="size-4" />
                    Войти
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isLogin ? "Вход в аккаунт" : "Регистрация"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Подождите...
                                </>
                            ) : (
                                isLogin ? "Войти" : "Зарегистрироваться"
                            )}
                        </Button>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Или</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Войти через Google
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                            }}
                        >
                            {isLogin ? "Нет аккаунта? Создать" : "Уже есть аккаунт? Войти"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
