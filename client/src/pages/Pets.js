import React, {useState} from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const PET_FIELDS_FRAGMENT = gql`
  fragment PetFieldsFragment on Pet {
    id
    name
    type
    img
    vaccinated  @client
    owner {
      id
      age @client
    }
  }
`;

const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetFieldsFragment
    }
  }
  ${PET_FIELDS_FRAGMENT}
`;

const CREATE_PET = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      ...PetFieldsFragment
    }
  }
  ${PET_FIELDS_FRAGMENT}
`;

const updateCache = (cache, { data: { addPet } }) => {
  const { pets } = cache.readQuery({ query: ALL_PETS });

  console.log({ addPet, pets })

  cache.writeQuery({
    query: ALL_PETS,
    data: { pets: [addPet, ...pets]}
  })
}

// 
export default function Pets () {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS);
  const [createPet, { data: mData, loading: mLoading, error: mError }] = useMutation(CREATE_PET, { update: updateCache });

  const onSubmit = input => {
    setModal(false)

    console.log({ input })

    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: "Pet",
          id: "123",
          name: input.name,
          type: input.type,
          img: "https://via.placeholder.com/300"
        }
      }
    })
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if(loading || mLoading) return <Loader />

  if(error || mError) return <p>Error</p>

  console.log({ data })

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
