/**
 * Carrega as variáveis de ambiente do arquivo .env
 */
class EnvLoader {
    constructor() {
        this.env = {};
    }

    async load() {
        try {
            const response = await fetch('.env');
            const text = await response.text();

            // Parse do arquivo .env
            const lines = text.split('\n');
            lines.forEach(line => {
                // Ignorar comentários e linhas vazias
                if (line.trim() && !line.trim().startsWith('#')) {
                    const [key, ...valueParts] = line.split('=');
                    const value = valueParts.join('=').trim();
                    this.env[key.trim()] = value;
                }
            });

            return this.env;
        } catch (error) {
            console.error('Erro ao carregar .env:', error);
            throw new Error('Não foi possível carregar o arquivo .env. Certifique-se de que ele existe e está configurado corretamente.');
        }
    }

    get(key) {
        return this.env[key];
    }
}

// Exportar instância global
window.envLoader = new EnvLoader();
