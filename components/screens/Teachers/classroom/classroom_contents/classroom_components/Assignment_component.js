import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { auth } from '../../../../../../firebase';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TouchableOpacity } from 'react-native-web';
import { useState } from 'react';

const Assignment_component = (props) => {
    const [pdf,setpdf]=useState()
    const [image,setImage]=useState()
    const [attachment,set_attachment]=useState()

    const assignment_title = props.Assignment_title_
    const Assignment_description = props.Assignment_description_
    const Assignment_time = props.created_at_
    const Attachment=props.attachment
    const Attachment_type=props.attachment_type
    
    if(Attachment_type=='image'){
      setImage(Attachment)
    }
    else if(Attachment_type=='pdf'){
      setpdf(Attachment)
    }else {
      set_attachment(Attachment)
    }
    const card = (
        <React.Fragment>
          <CardHeader
            avatar={
                <AssignmentIcon color="primary" sx={{ fontSize: 40 }}/>
                }
            action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={assignment_title}
              subheader={Assignment_time}
          />
          <CardContent>
           <View style={styles.Assignment_file}>
             <Text>{Assignment_description}</Text>
             <View>
                {image && <Text>{image}</Text>

                }        
                {pdf && <Text>{pdf}</Text>

                }  
                {Attachment && <Text>{Attachment}</Text>

                }
            </View> 
            </View>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
          </CardActions>
        </React.Fragment>
      );
    return (<>
    <View style={styles.Assignment_container}>
        <Card variant="outlined">{card}</Card>
    </View>
    </>
  )
}

export default Assignment_component

const styles = StyleSheet.create({
    Assignment_container:{
        margin:10,
    },
    Assignment_file:{

    },
})

/**
 * <View style={styles.Assignment_container}>
        <View style={styles.Assignment_button}>
            <View style={styles.Assignment_icon_container}>
               <AssignmentIcon color="primary" sx={{ fontSize: 40 }}/>
            </View>
            <View>
                <Text>Name of the Assignment</Text>
            </View>
        </View>
    </View>
 */