import { UndoableCommand } from "interacto";
import { GameService } from "../services/game.service";
import { Game } from "../classes/game";
import { Tile } from "../classes/tile";
import { ChangeDetectorRef } from "@angular/core";

export class SetValue extends UndoableCommand {
    public readonly game: Game;
    public index:number;

    public oldValue: Tile[]; //grid when the user clicks
    public newValue: Tile[]; //grid after the tiles move

    public constructor(public current_game:Game,public x:number,public game_service:GameService, public cdr:ChangeDetectorRef) {
        super();
        this.index=x;
        this.game=current_game;
        this.oldValue=current_game.grid.gridTiles;
        this.newValue=this.game_service.tilesAfterMove;
    }

    protected override createMemento() {
        this.oldValue = this.game.gridData.tiles;
    }

    public override canExecute(): boolean {
        return this.game.gridData.tiles !== this.newValue;
    }

    protected execution(): void {
    }

    public redo(): void {
        this.game_service.game?.increaseScore();
        this.game_service.grid=this.newValue;
        this.cdr.detectChanges();
    }
    public undo(): void {
        this.game_service.game?.increaseScore();
        this.game_service.grid=this.oldValue;
        this.cdr.detectChanges();
    }

    public override getUndoName(): string {
        return "";
    }

    public static getImageIndex(x: string): number {
        const imagelist: { [key: string]: number } = {
            'angular':0,
            'gitlab':1,
            'java':2,
            'npm':3,
            'spring':4,
            'ts':5
        };
        return imagelist[x];
    }

    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
        return SetValue.getSnapshot(this.game);
    }

    public static getSnapshot(game: Game): Promise<HTMLElement> | HTMLElement | undefined {
        console.log("getSnapshot");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tileSize = 110;

        //Define images' dimensions in the history (we want a square)
        const gridSize= Math.sqrt(game.gridData.tiles.length)
        canvas.width = tileSize*gridSize;
        canvas.height = tileSize*gridSize;

        let images: Array<string>=["/dev/angular.webp","/dev/gitlab.webp","/dev/java.webp","/dev/npm.webp","/dev/spring.webp","/dev/ts.webp"]

        return new Promise((resolve) => {
            const imagePromises = game.gridData.tiles.map((tile) => {

                if (tile.name === "vide") return Promise.resolve(null); // Ignorer la case vide

                const img = new Image();
                let index = SetValue.getImageIndex(tile.name);

                img.src = images[index];
                return new Promise<HTMLImageElement>((imgResolve) => {
                    //console.log(img.src);
                    img.onload = () => imgResolve(img);
                });
            });

            Promise.all(imagePromises).then((images) => {
                // Draw images into the grid
                images.forEach((img, index) => {
                    const x = (index % gridSize) * tileSize; // Column
                    const y = Math.floor(index / gridSize) * tileSize; // Row

                    if (img) {
                        ctx.drawImage(img, x, y, tileSize, tileSize); // Draw image
                        console.log("dessiner");
                    } else {
                        // Draw an empty tile
                        ctx.fillStyle ='lightgrey';
                        ctx.fillRect(x, y, tileSize, tileSize);
                    }
                });
                ctx.stroke();
                const imgCache = new Image();
                imgCache.src = canvas.toDataURL('image/png');
                resolve(imgCache);
            });
        });
    }
}
