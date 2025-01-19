import {createResource, createSignal, For, Show} from "solid-js";
import {PicsumImage} from "./Image";
import "./Image.css";
import imageData from './ImageData.json';

const fetchImages = async (pageAndLimit: { page: number, limit: number }): Promise<PicsumImage[]> => {
    return imageData;
};

export const PreFetchImages = () => {
    const [pageAndLimit, setPageAndLimit] = createSignal({page: 1, limit: 300});
    const [imageList] = createResource(pageAndLimit, fetchImages);
    return (<>
        <h1>Lazy loading images</h1>
        <p>This will lazy load images as user is scrolling down the content</p>
        <p>Lazy loaded images will be stored in the cache.</p>
        <Show when={imageList.latest}>
            <div class="image-container">
                <For each={imageList.latest}>
                    {(image) => <img
                        loading="eager"
                        class="item"
                        src={image.url}
                        height={image.height}
                        width={image.width}
                    />}
                </For>
            </div>
        </Show>
        <Show when={imageList.error}>Error: {imageList.error.message}</Show>
        <Show when={imageList.loading}>Loading...</Show>
    </>)
}

export default PreFetchImages;