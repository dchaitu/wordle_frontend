const ShowText =  () => {


    const getValue = async () => {
        const response = await fetch("http://localhost:8000/word/",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        return data;

    };
    return (<div>
        <h1>Answer is: </h1>
    </div>);
}
export default ShowText;