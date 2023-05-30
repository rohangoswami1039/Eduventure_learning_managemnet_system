import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@mui/material/Button';
import { TouchableOpacity } from 'react-native-web';


const Admin = () => {
  return (
    <View>
      <Text>Admin</Text>
        <TouchableOpacity>
            <Button style={styles.button} variant='contained'>Add user</Button>
        </TouchableOpacity>

        <TouchableOpacity>
            <Button style={styles.button} variant='contained'>Remove User</Button>
        </TouchableOpacity>

        <TouchableOpacity>
            <Button style={styles.button} variant='contained'>Show all notices</Button>
        </TouchableOpacity>

    </View>
  )
}

export default Admin

const styles = StyleSheet.create({})