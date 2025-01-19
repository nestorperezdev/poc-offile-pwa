import type {Component} from 'solid-js';
import styles from './App.module.css';
import "./App.css"
import {createSignal, For, Match, Switch} from "solid-js";
import LazyLoadingImages from "./LazyLoadingImages";
import PreFetchImages from "./PreFetchImages";

const App: Component = () => {
    const availableOptions = [
        {value: TabSelected.Lazy, label: "Lazy loading"},
        {value: TabSelected.Eager, label: "Eager loading"},
    ];
    const [tabSelected, setTabSelected] = createSignal(TabSelected.Lazy);
    return (
        <div class="page">
            <div class="tab-container">
                <For each={availableOptions}>
                    {(item) => (
                        <div className="tab" classList={{active: tabSelected() === item.value}}
                             onClick={() => setTabSelected(item.value)}>
                            {item.label}
                        </div>
                    )}
                </For>
            </div>
            <div class="content">
                <Switch>
                    <Match when={tabSelected() === TabSelected.Lazy}>
                        <LazyLoadingImages/>
                    </Match>
                    <Match when={tabSelected() === TabSelected.Eager}>
                        <PreFetchImages/>
                    </Match>
                </Switch>
            </div>
        </div>
    );
};

enum TabSelected {
    Lazy,
    Eager,
}

const Image: Component = () => {
    return <img src={`https://placehold.co/600x400`}/>
};

export default App;
