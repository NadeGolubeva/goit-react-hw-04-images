import { Dna} from 'react-loader-spinner';

export const Loader = () => {
    return (
    
  <Dna
  visible={true}
  height="150"
  width="150"
  ariaLabel="dna-loading"

        wrapperClass="dna-wrapper"
        wrapperStyle={{
          display: 'block',
          marginTop: 35,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
/> 
)
}