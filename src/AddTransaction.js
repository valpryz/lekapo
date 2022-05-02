import { useState, useEffect } from "react"
import { useFirestore } from "./hooks/useFirestore"
import Modal from './Modal'

export default function AddTransaction() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [selected, setSelected] = useState('entree')
  const [valeurDollar, setValeurDollar] = useState('')
  const [prixVenteDollar,setPrixVenteDollar] = useState('')
  const [showModal, setShowModal] = useState(false)
  let montantFinal = Number(amount) * Number(valeurDollar)
  const { addDocument, response } = useFirestore('transactions')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      name,
      amount,
     selected,
     valeurDollar,
     prixVenteDollar,
     montantFinal
    });
  }

   // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
      setSelected('entree')
      setValeurDollar('')
      setPrixVenteDollar('')
    }
    setShowModal(true)
  }, [response.success])

  return (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Ajouter une transaction</h1>
              </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Type de transaction
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="type"
                  name="type"
                  autoComplete="type-de-transaction"
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value='entree'>Entrée</option>
                  <option value='sortie'>Sortie</option>
                  <option value='sortie-dubai'>Sortie Dubaï</option>
                </select>
              </div>
            </div>
            {
              (selected === 'entree' || selected === 'sortie') &&
              (<>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Motif
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="motif"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Montant (en FCFA)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="montant"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                  value={amount}
                  required
                />
              </div>
            </div>
            
              </>)
            }

            {
              selected === 'sortie-dubai' && (
              <>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Motif
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="motif"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Montant (en dollars)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="montant"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Valeur réelle du dollar à l'instant
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="montant"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setValeurDollar(e.target.value)}
                  value={valeurDollar}
                  required
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Prix du dollar à la vente
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="montant"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setPrixVenteDollar(e.target.value)}
                  value={prixVenteDollar}
                  required
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Montant final à la vente (en FCFA)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <p>{montantFinal.toLocaleString('en-US')}</p>
              </div>
            </div>
              </>)
            }
            
          </div>
          
        </div>
      </div>
      {response.success && (showModal && <Modal />) }      
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  )
}
