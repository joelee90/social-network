import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Hello />,
    document.querySelector('main')
);

function Hello() {
    const [greetee, setGreetee] = useState('World');
    //current value and function to change current value.
    // console.log(greetee);
    const [bool, setBool] = useState(false);
    const onChange = e => {
        setGreetee(e.target.value);
    };

    useEffect(() => {
        console.log(`"${greetee}" has been rendered`);
        return () => {
            console.log(`"${greetee}" is going to change`);
        };
    }, [greetee]);
    //runs everytime updates, function - componentdidmout, componentdidupdate
    //doesnt different between first and subsequent render,
    //2nd arg - before calling the function, value of the array will be seen and only
    //change when there is change in the array.
    //when pass empty array, gurantee that the useEffect runs first time.
    //any changes in the array will call the function.
    //componentwillmount --> if effect returns a function, run before the new render.
    //handling 'out of order' response to ajax request.
    //

    return (
        <div>
            <p>
                Hello, {greetee}
            </p>
            <input onChange={onChange} defaultValue={greetee}/>
            <div onClick={e => setBool(true)}>
            </div>
        </div>
    );
}

//function gets called everytime, new var created everytime, value depends on whatever value is currently,
// but the function is consistent.

// --------------------------hook part 2----------------------------------------

function useLoginRegistrationSubmit()

function useStatefulFields() {
    const [fields, setFields] = useState({});
    const handleChange = ({target}) => {
        setFields({
            ...fields,
            [target.name]: target.value
        });
    };
    return [fields, handleChange];
}

//... spread operator in object(clone object, and update the object)
//[target.name] existing property.
// hook can call other hooks, able to use hooks inside another hooks.
//convenient way to share component between object
