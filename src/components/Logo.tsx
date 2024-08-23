import { useTheme } from "@/hooks/useTheme";

const Logo = () => {

    const { enabledDarkMode } = useTheme();

    return (
        <img src={`/logo-${enabledDarkMode ? 'white' : 'black'}.png`} className="w-full h-full" alt="Collectify Logo" />
    )
}
export default Logo