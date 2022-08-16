export default class ImageUtils {
	public static loadImageFromUrl(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				resolve(img);
			}
			img.onerror = () => {
				img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
			}
			img.src = url;
		});
	}
}