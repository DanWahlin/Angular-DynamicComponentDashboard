import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class ScriptLoaderService {
    private scripts: ScriptModel[] = [];

    public load(scriptModels: ScriptModel[]): Observable<ScriptModel[]> {
        let observables: Observable<ScriptModel>[] = [];

        for (let script of scriptModels) {
            let observable = new Observable<ScriptModel>((observer: Observer<ScriptModel>) => {
                var existingScript = this.scripts.find(s => s.name == script.name);

                // If already loaded then simply complete
                if (existingScript && existingScript.loaded) {
                    observer.next(existingScript);
                    observer.complete();
                }
                else {
                    this.scripts.push(script);

                    // Load the script
                    let scriptElement = document.createElement("script");
                    scriptElement.type = "text/javascript";
                    scriptElement.src = script.src;

                    scriptElement.onload = () => {
                        script.loaded = true;
                        observer.next(script);
                        observer.complete();
                    };

                    scriptElement.onerror = (error: any) => {
                        observer.error("Couldn't load script " + script.src);
                    };

                    document.getElementsByTagName('body')[0].appendChild(scriptElement);
                }
            });
            observables.push(observable);
        }

        return Observable.combineLatest(observables);
    }
}

export interface ScriptModel {
    name: string,
    src: string,
    loaded?: boolean
}