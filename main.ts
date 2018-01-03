import { Observable } from "rxjs"
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";


let output = document.getElementById("output");
let button = document.getElementById("button");

let numbers = [1, 5, 10];
// let source = Observable.from(numbers);


let click = Observable.fromEvent(button,'click');

let mouseH = Observable.fromEvent(document,'mousemove')
                        .map((e:MouseEvent) => {
                                return {
                                    x: e.clientX,
                                    y: e.clientY
                                }
                        })
                        .filter(value => value.x < 500)
                        .delay(300);

                        


let source = Observable.create(
    observer => {

        let index=0;
        let produceValue = () => {
            observer.next(numbers[index++]);

            if(index < numbers.length){
                setTimeout(produceValue, 200);
            }else{
                observer.complete();
            }
        }

        produceValue();
        // for(let n of numbers){
        //     observer.next(n);
        // }
        // observer.complete();
    }
)
.map(n => n * 2)
.filter(n => n > 4);



// function onNext(value){
//     circle.style.left = value.x;
//     circle.style.top = value.y;
// }

function load(url: string){
 let xhr = new XMLHttpRequest();
 xhr.addEventListener("load", ()=>{
     let movies = JSON.parse(xhr.responseText);
     movies.forEach(element => {
         let div = document.createElement('div');
         div.innerText = element.title;
         output.appendChild(div);
     });
 })
 xhr.open("GET", url, true);
 xhr.send();
}

click.subscribe(
    e => load("movie.json"),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);


// mouseH.subscribe(
//     value => console.log(value),
//     e => console.log(`error: ${e}`),
//     () => console.log("complete")
// );

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);



// class MyObserver{
//     next(value){
//         console.log(`value: ${value}`);
//     }

//     error(e){
//         console.log(`error: ${e}`);
//     }

//     complete(){
//         console.log("complete");
//     }
// }

// source.subscribe(new MyObserver());
