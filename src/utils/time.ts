export function getTime() {
  let msg = ''
  const curHours = Number(new Date().getHours())
  if (curHours < 9)
    msg = '早上'
  else if (curHours < 12)
    msg = '上午'
  else if (curHours < 18)
    msg = '下午'
  else
    msg = '晚上'

  //   switch (curHours as number) {
  //     case curHours < 9 :
  //       msg = '早上'
  //       break
  //     case curHours < 12:
  //       msg = '上午'
  //       break
  //     case curHours < 18:
  //       msg = '下午好'
  //       break
  //     default: msg = '晚上好'
  //   }
  return msg
}
