import React from 'react'

const TransactionList = ({transactions}) => {

    const arrDepenses = transactions.filter(transaction => transaction.selected.includes('sortie'))
    console.log(arrDepenses);
    let depenses = arrDepenses.map(dep => {
        if(dep.montantFinal){
         return   Number(dep.montantFinal)
        }else {
         return Number(dep.amount)
        }
    }).reduce((prev, current) => prev + current)

    const arrEntrees = transactions.filter(transaction => transaction.selected === 'entree')
    let entrees = arrEntrees.map(dep => {
        if(dep.montantFinal){
         return   Number(dep.montantFinal)
        }else {
         return Number(dep.amount)
        }
    }).reduce((prev, current) => prev + current)


  return (
    <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                    >
                      Désignation
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Débit
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Crédit
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {transaction.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(transaction.createdAt.seconds * 1000).toLocaleDateString("fr-FR")}</td>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-red-500">{transaction.selected.includes('sortie') && (transaction.montantFinal ? Number(transaction.montantFinal).toLocaleString('en-US') : Number(transaction.amount).toLocaleString('en-US')) }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-green-500">{transaction.selected === 'entree' && (transaction.montantFinal ? Number(transaction.montantFinal).toLocaleString('en-US') : Number(transaction.amount).toLocaleString('en-US')) }</td>
                      
                    </tr>
                  ))}
                </tbody>
                <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
              >
                Balance
              </th>
              <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">
                Balance
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{(entrees - depenses).toLocaleString('en-US')} FCFA</td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Bénéfice Net
              </th>
              <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
                Bénéfice Net
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                {((entrees - depenses) - (Number(transactions[0].amount))).toLocaleString('en-US')} FCFA
              </td>
            </tr>
          </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TransactionList