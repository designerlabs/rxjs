import { Observable } from "rxjs";

let numbers = [1, 5, 10];
// let source = Observable.from(numbers);
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
