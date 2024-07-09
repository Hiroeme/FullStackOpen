const Person = ({person, deletion}) => {
    return (
    <div 
    key={person.name}>
        {person.name} 
        {person.number}
        <button onClick={deletion}>delete</button>
    </div>)
}

export default Person