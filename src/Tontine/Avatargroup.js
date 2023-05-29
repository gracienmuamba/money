import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
 return (
  <AvatarGroup total={24}>
   <Avatar alt="Remy Sharp" src="/img/1.jpg" />
   <Avatar alt="Travis Howard" src="/img/2.jpg" />
   <Avatar alt="Agnes Walker" src="/img/4.jpg" />
   <Avatar alt="Trevor Henderson" src="/img/5.jpg" />
  </AvatarGroup>
 );
}
