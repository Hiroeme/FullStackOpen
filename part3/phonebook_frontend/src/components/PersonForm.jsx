const PersonForm = ({addPerson, handlePersonChange, handlePhoneChange, newName, newPhone}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          onChange={handlePersonChange} 
          value={newName}
          />
        </div>
        <div>
          number: 
          <input
            onChange={handlePhoneChange}
            value={newPhone}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm