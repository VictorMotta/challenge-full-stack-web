export function caseInsensitiveObject<T>(
	body: Record<string, T>, // Tipagem para um objeto genérico com chaves string e valores de tipo T
	convertCase: (key: string) => string // Função que transforma a chave
): Record<string, T> {
	const object: Record<string, T> = {}; // Criação do objeto resultante com a mesma tipagem
	Object.keys(body).forEach((key) => {
		object[convertCase(key)] = body[key];
	});
	return object;
}
