import { useCollection } from "./hooks/useCollection"
import TransactionList from "./TransactionList"

export default function Historique() {
  const { documents, error } = useCollection('transactions', ['createdAt', 'asc'])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Historique des transactions</h1>
              </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          
        </div>
      </div>
      { error && <p>{error}</p>}
      { documents && <TransactionList transactions={documents}/>}
    </div>
  )
}
