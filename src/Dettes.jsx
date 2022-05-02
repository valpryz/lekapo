import { useState, useEffect } from 'react'
import AjoutDeDettes from "./AjoutDeDettes"
import { useFirestore } from "./hooks/useFirestore"
import { useCollection } from "./hooks/useCollection"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dettes() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const { addDocument, deleteDocument, response } = useFirestore('dettes')
    const { documents, error } = useCollection('dettes', ['createdAt', 'asc'])

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument(
            {name,
            price}
        )
        setName('')
        setPrice('')
    }

    useEffect(() => {
    if (response.success) {
      setName('')
      setPrice('')
    }
  }, [response.success])

    const handleName = (e) => setName(e.target.value)
    const handlePrice = (e) => setPrice(e.target.value)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Listing des dettes</h1>
          <AjoutDeDettes 
            handleSubmit={handleSubmit}
            handleName={handleName}
            handlePrice={handlePrice}
            name={name}
            price={price}/>
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Nom
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Montant
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Supprimer</span>
              </th>
            </tr>
          </thead>
          <tbody>
              { error && <p>{error}</p>}
            {documents && documents.map(document => (
              <tr key={document.id}>
                <td
                  className={classNames(
                    document.id === 0 ? '' : 'border-t border-transparent',
                    'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                  )}
                >
                  <div className="font-medium text-gray-900">
                    {document.name}
                  </div>
                
                  {document.id !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                </td>
                <td>
                  <div className="sm:hidden">{Number(document.price).toLocaleString('en-US')} FCFA</div>
                  <div className="hidden sm:block">{Number(document.price).toLocaleString('en-US')} FCFA</div>
                </td>   
                <td>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => deleteDocument(document.id)}
                  >
                    Retirer
                  </button>
                  {document.id !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
