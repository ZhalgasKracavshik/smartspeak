import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    actualTheme: 'dark' | 'light'; // The actual applied theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('smartspeak-theme');
        return (saved as Theme) || 'system';
    });

    const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        let applied: 'dark' | 'light' = 'light';

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            applied = systemTheme;
            root.classList.add(systemTheme);
        } else {
            applied = theme;
            root.classList.add(theme);
        }

        setActualTheme(applied);
        localStorage.setItem('smartspeak-theme', theme);
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            setActualTheme(systemTheme);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
