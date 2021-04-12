import React, {useRef,  useState, useEffect, memo, useLayoutEffect, useMemo } from 'react';
import { tableData } from './MockTableSortData/mockTableSort';

// class TableSorting extends React.PureComponent {
//   constructor(props){
//     super(props);
//     this.state = {
//       tableArray: [],
//     }
//   }


//   componentDidMount() {
//     this.setState({
//       tableArray: tableData[0].col.data
//     });
//   }

//   handleSortByName = (columnName) => {
//     const sortedArray = this.state.tableArray.sort((a, b) => a.row.localeCompare(b.row));
//     console.log('sortedArray - ', sortedArray)
//     this.setState({
//       tableArray: sortedArray
//     });
//     // this.forceUpdate();
//   }

//   // shouldComponentUpdate(nextProps, nextState) {
//   //   const {
//   //     tableArray: oldArray = []
//   //   } = this.state
//   //   const {
//   //     tableArray: newArray = []
//   //   } = nextState;
//   //   console.log('oldArray - ', oldArray);
//   //   console.log('newArray - ', newArray);
//   //   if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
//   //     return true
//   //   } else {
//   //     return false;
//   //   }
//   // }

//   render() {
//     const {
//       tableArray = [],
//     } = this.state;
//     return (
//       <>
//       <table>
//         <th>
//           <td onClick={() => this.handleSortByName('name')} style={{ cursor: 'pointer' }}>Name</td>
//           <td>City</td>
//         </th>
//         <tbody>
//           <td>
//             {
//               tableArray.map((obj) => (
//                 <>
//                     <tr key={`key-${obj.row}-${Math.random()}`}>
//                       <td>{obj.row}</td>
//                     </tr>
//                 </>
//               ))
//             }
//           </td>
//         </tbody>
//       </table>
//       </>
//     )
//   }
// }

const TableSorting = () => {
  const initialArray = tableData
  const [tableArray, setTableArray] = React.useState(initialArray);
  const [count, setCount] = useState(0)

  const handleSortByName = (e, column) => {
    e.preventDefault();
    let sortedArray;
    if (column === 'firstName') {
      sortedArray = tableArray.sort((a, b) => a[column].localeCompare(b[column]));
    } else if (column === 'city') {
      sortedArray = tableArray.sort((a, b) => a[column].localeCompare(b[column]));
    } else if (column === 'balance') {
      sortedArray = tableArray.sort((a, b) => a[column] - b[column]);
    } else {
      sortedArray = tableArray
    }
    setCount(count + 1);
    setTableArray(sortedArray);
  }

  return (
    <div>
      <table>
        <th>
          <td onClick={(e) => handleSortByName(e, 'firstName')} style={{ cursor: 'pointer' }}>Name</td>
          <td onClick={(e) => handleSortByName(e, 'lastName')} style={{ cursor: 'pointer' }}>Last Name</td>
          <td onClick={(e) => handleSortByName(e, 'city')} style={{ cursor: 'pointer' }}>City</td>
          <td onClick={(e) => handleSortByName(e, 'balance')} style={{ cursor: 'pointer' }}>Balance</td>
        </th>
        <tbody>
          <td>
            {
              tableArray.map((obj) => (
                <>
                    <tr>
                      <td>{obj.firstName}</td>
                      <td>{obj.lastName}</td>
                      <td>{obj.city}</td>
                      <td>{obj.balance}</td>
                    </tr>
                </>
              ))
            }
          </td>
        </tbody>
      </table>
    </div>
  )
}

export default TableSorting;