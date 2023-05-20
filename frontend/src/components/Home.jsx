import { Badge, Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToastMsg from '../customHooks/useToastMsg';
import { getAllUsersAction, udpateUserAction } from '../redux/users/user.actions';
import Loading from './Lading';
import style from '../styles/Home.module.css';
import { FaRegEdit, FaDownload } from 'react-icons/fa';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}



function Home() {
     const toastMsg = useToastMsg();
     const dispatch = useDispatch();
     const { loading, users } = useSelector(store => store.usersManager);
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [updateUserId, setUpdateUserId] = useState();


     const handleSubmit = useCallback((e) => {
          e.preventDefault();

          const update = {}
          if (e.target.name.value) update.name = e.target.name.value;
          if (e.target.email.value) update.email = e.target.email.value;
          if (e.target.gender.value) update.gender = e.target.gender.value;

          dispatch(udpateUserAction(toastMsg, updateUserId, update))
          onClose();
     }, [dispatch, onClose, toastMsg, updateUserId])


     useEffect(() => {
          dispatch(getAllUsersAction(toastMsg))
     }, [])

     return loading ? <Loading /> : (
          <>
               <Box className={style.home}>
                    <Button className={style['download-btn']}>
                         <Text>Download CSV</Text>
                         <FaDownload />
                    </Button>


                    <TableContainer className={style['users-table']}>
                         <Table variant='simple' className={style['users-table']}>
                              <TableCaption
                                   fontSize='15px'
                                   fontWeight='600'
                              >All Users of our application</TableCaption>
                              <Thead>
                                   <Tr>
                                        <Th>SN</Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Gender</Th>
                                        <Th>Created at</Th>
                                        <Th>Status</Th>
                                        <Th>Edit info</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {
                                        users?.map((el, ind) => (<Tr key={el._id}>
                                             <Td>{ind + 1}</Td>
                                             <Td>{el.name}</Td>
                                             <Td>{el.email}</Td>
                                             <Td>{el.gender}</Td>
                                             <Td>{getDateAndTime(el.createdAt)}</Td>
                                             <Td>
                                                  <Badge variant='outline' colorScheme={el.status === 'active' ? "green" : "orange"}>
                                                       {el.status}
                                                  </Badge>
                                             </Td>
                                             <Td>
                                                  <Button onClick={() => {
                                                       onOpen()
                                                       setUpdateUserId(el._id)
                                                  }}>
                                                       <FaRegEdit />
                                                       <Text>Edit</Text>
                                                  </Button>
                                             </Td>
                                        </Tr>))
                                   }
                              </Tbody>
                         </Table>
                    </TableContainer>
               </Box>


               <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalCloseButton />
                         <ModalBody>
                              <form className={style['update-form']} onSubmit={handleSubmit}>
                                   <Input type="text" id="name" placeholder="Enter name" />
                                   <Input type="email" id="email" placeholder="Enter email" />
                                   <Select id="gender">
                                        <option value="">Choose gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                   </Select>
                                   <Button type="submit">Update</Button>
                              </form>
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default Home