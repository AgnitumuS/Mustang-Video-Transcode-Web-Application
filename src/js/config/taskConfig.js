'use strict';

export const taskConfig = {
      transcodeType:[
        { Task_Type_value: "vod", label: 'VOD' },
        { Task_Type_value: "live", label: 'Live' },
        { Task_Type_value: "file", label: 'File' }
      ],
      fileType:[
        { File_Type_value: 0, label: 'MKV' },
        { File_Type_value: 1, label: 'MP4' },
        { File_Type_value: 2, label: 'FLV' },
        { File_Type_value: 3, label: 'F4V' },
        { File_Type_value: 4, label: 'AVI' },
        { File_Type_value: 5, label: 'WEBM' },
        { File_Type_value: 6, label: 'MPEG' },
        { File_Type_value: 7, label: 'MOV' },
        { File_Type_value: 8, label: 'MPG' }
      ],
      Video_Codec:[
        { Video_Codec_value: 1, label: 'H.264' },
        { Video_Codec_value: 2, label: 'H.265' },
        { Video_Codec_value: 3, label: 'VP8' },
        { Video_Codec_value: 4, label: 'VP9' },
        { Video_Codec_value: 5, label: 'MPEG2' }
      ],
      Video_Profile: [
        { Video_Profile_value: 1, label: 'Main' },
        { Video_Profile_value: 2, label: 'High' }
      ],
      Video_Level: [
        { Video_Level_value: 1, label: '3.1' },
        { Video_Level_value: 2, label: '3.2' },
        { Video_Level_value: 3, label: '4' },
        { Video_Level_value: 4, label: '4.1' },
        { Video_Level_value: 5, label: '4.2' },
        { Video_Level_value: 6, label: '5' },
        { Video_Level_value: 7, label: '5.1' },
        { Video_Level_value: 8, label: '5.2' },
        { Video_Level_value: 9, label: '6' },
        { Video_Level_value: 10, label: '6.1' },
        { Video_Level_value: 11, label: '6.2' }
      ],
      Audio_Codec: [
        { Audio_Codec_value: 1, label: 'AAC' },
        { Audio_Codec_value: 2, label: 'MP3' },
        { Audio_Codec_value: 3, label: 'Vorbis' },
        { Audio_Codec_value: 4, label: 'Copy' },
        { Audio_Codec_value: 5, label: 'Disable' }
      ],
      Audio_BitRate: [
        { Audio_BitRate_value: 1, label: '64  kbps' },
        { Audio_BitRate_value: 2, label: '96  kbps' },
        { Audio_BitRate_value: 3, label: '128 kbps' },
        { Audio_BitRate_value: 4, label: '192 kbps' }
      ],
      Video_Resolution: [
        { Video_Resolution_value: 1, label: '3840x2160' },
        { Video_Resolution_value: 2, label: '2560x1440' },
        { Video_Resolution_value: 3, label: '1920x1080' },
        { Video_Resolution_value: 4, label: '1280x720' },
        { Video_Resolution_value: 5, label: '858x480' },
        { Video_Resolution_value: 6, label: '640x360' },
        { Video_Resolution_value: 7, label: '426x249' }
      ],
      Video_BitRate: [
        { Video_BitRate_value: 1, label: '1 Mbps' },
        { Video_BitRate_value: 2, label: '2 Mbps' },
        { Video_BitRate_value: 3, label: '3 Mbps' },
        { Video_BitRate_value: 4, label: '4 Mbps' },
        { Video_BitRate_value: 5, label: '5 Mbps' },
        { Video_BitRate_value: 6, label: '6 Mbps' },
        { Video_BitRate_value: 7, label: '7 Mbps' },
        { Video_BitRate_value: 8, label: '8 Mbps' },
        { Video_BitRate_value: 9, label: '9 Mbps' },
        { Video_BitRate_value: 10, label: '10 Mbps' },
        { Video_BitRate_value: 11, label: '11 Mbps' },
        { Video_BitRate_value: 12, label: '12 Mbps' },
        { Video_BitRate_value: 13, label: '13 Mbps' },
        { Video_BitRate_value: 14, label: '14 Mbps' },
        { Video_BitRate_value: 15, label: '15 Mbps' },
        { Video_BitRate_value: 16, label: '16 Mbps' },
        { Video_BitRate_value: 17, label: '17 Mbps' },
        { Video_BitRate_value: 18, label: '18 Mbps' },
        { Video_BitRate_value: 19, label: '19 Mbps' },
        { Video_BitRate_value: 20, label: '20 Mbps' },
        { Video_BitRate_value: 21, label: '21 Mbps' },
        { Video_BitRate_value: 22, label: '22 Mbps' },
        { Video_BitRate_value: 23, label: '23 Mbps' },
        { Video_BitRate_value: 24, label: '24 Mbps' },
        { Video_BitRate_value: 25, label: '25 Mbps' }
      ],
      Stream_Protocol: [
        { Stream_Protocol_value: 0, label: 'RTMP' },
        { Stream_Protocol_value: 1, label: 'HLS' },
        { Stream_Protocol_value: 2, label: 'MPEG-DASH' },
        { Stream_Protocol_value: 3, label: 'ICECAST' }
      ],
      FrameRate: [
        { FrameRate_value: 24, label: '24' },
        { FrameRate_value: 25, label: '25' },
        { FrameRate_value: 26, label: '26' },
        { FrameRate_value: 27, label: '27' },
        { FrameRate_value: 28, label: '28' },
        { FrameRate_value: 29, label: '29' },
        { FrameRate_value: 30, label: '30' },
        { FrameRate_value: 31, label: '31' },
        { FrameRate_value: 32, label: '32' },
        { FrameRate_value: 33, label: '33' },
        { FrameRate_value: 34, label: '34' },
        { FrameRate_value: 35, label: '35' },
        { FrameRate_value: 36, label: '36' },
        { FrameRate_value: 37, label: '37' },
        { FrameRate_value: 38, label: '38' },
        { FrameRate_value: 39, label: '39' },
        { FrameRate_value: 40, label: '40' },
        { FrameRate_value: 41, label: '41' },
        { FrameRate_value: 42, label: '42' },
        { FrameRate_value: 43, label: '43' },
        { FrameRate_value: 44, label: '44' },
        { FrameRate_value: 45, label: '45' },
        { FrameRate_value: 46, label: '46' },
        { FrameRate_value: 47, label: '47' },
        { FrameRate_value: 48, label: '48' },
        { FrameRate_value: 49, label: '49' },
        { FrameRate_value: 50, label: '50' },
        { FrameRate_value: 51, label: '51' },
        { FrameRate_value: 52, label: '52' },
        { FrameRate_value: 53, label: '53' },
        { FrameRate_value: 54, label: '54' },
        { FrameRate_value: 55, label: '55' },
        { FrameRate_value: 56, label: '56' },
        { FrameRate_value: 57, label: '57' },
        { FrameRate_value: 58, label: '58' },
        { FrameRate_value: 59, label: '59' },
        { FrameRate_value: 60, label: '60' }
      ],
      Vquality: [
        { Vquality_value: 1, label: '1' },
        { Vquality_value: 2, label: '2' },
        { Vquality_value: 3, label: '3' },
        { Vquality_value: 4, label: '4' },
        { Vquality_value: 5, label: '5' },
        { Vquality_value: 6, label: '6' },
        { Vquality_value: 7, label: '7' },
        { Vquality_value: 8, label: '8' },
        { Vquality_value: 9, label: '9' },
        { Vquality_value: 10, label: '10' },
        { Vquality_value: 11, label: '11' },
        { Vquality_value: 12, label: '12' },
        { Vquality_value: 13, label: '13' },
        { Vquality_value: 14, label: '14' },
        { Vquality_value: 15, label: '15' },
        { Vquality_value: 16, label: '16' },
        { Vquality_value: 17, label: '17' },
        { Vquality_value: 18, label: '18' },
        { Vquality_value: 19, label: '19' },
        { Vquality_value: 20, label: '20' },
        { Vquality_value: 21, label: '21' },
        { Vquality_value: 22, label: '22' },
        { Vquality_value: 23, label: '23' },
        { Vquality_value: 24, label: '24' },
        { Vquality_value: 25, label: '25' },
        { Vquality_value: 26, label: '26' },
        { Vquality_value: 27, label: '27' },
        { Vquality_value: 28, label: '28' },
        { Vquality_value: 29, label: '29' },
        { Vquality_value: 30, label: '30' },
        { Vquality_value: 31, label: '31' },
        { Vquality_value: 32, label: '32' },
        { Vquality_value: 33, label: '33' },
        { Vquality_value: 34, label: '34' },
        { Vquality_value: 35, label: '35' },
        { Vquality_value: 36, label: '36' },
        { Vquality_value: 37, label: '37' },
        { Vquality_value: 38, label: '38' },
        { Vquality_value: 39, label: '39' },
        { Vquality_value: 40, label: '40' },
        { Vquality_value: 41, label: '41' },
        { Vquality_value: 42, label: '42' },
        { Vquality_value: 43, label: '43' },
        { Vquality_value: 44, label: '44' },
        { Vquality_value: 45, label: '45' },
        { Vquality_value: 46, label: '46' },
        { Vquality_value: 47, label: '47' },
        { Vquality_value: 48, label: '48' },
        { Vquality_value: 49, label: '49' },
        { Vquality_value: 50, label: '50' }
      ]
}

const taskConfig_h264 = {
    //Video_Profile Main/High
      Video_Level:{
        "Main":[
          { Video_Level_value: 1, label: '3.1' },
          { Video_Level_value: 2, label: '3.2' },
          { Video_Level_value: 3, label: '4' },
          { Video_Level_value: 4, label: '4.1' },
          { Video_Level_value: 5, label: '4.2' },
          { Video_Level_value: 6, label: '5' },
          { Video_Level_value: 7, label: '5.1' },
          { Video_Level_value: 8, label: '5.2' }
        ],
         "High":[
           { Video_Level_value: 1, label: '3.1' },
           { Video_Level_value: 2, label: '3.2' },
           { Video_Level_value: 3, label: '4' },
           { Video_Level_value: 4, label: '4.1' },
           { Video_Level_value: 5, label: '4.2' },
           { Video_Level_value: 6, label: '5' },
           { Video_Level_value: 7, label: '5.1' },
           { Video_Level_value: 8, label: '5.2' }
        ]
      } ,
      Audio_Codec:{
        "File":[
          { Audio_Codec_value: 1, label: 'AAC' },
          { Audio_Codec_value: 2, label: 'MP3' },
          { Audio_Codec_value: 4, label: 'Copy' },
          { Audio_Codec_value: 5, label: 'Disable' }
        ],
        "Stream": [
          { Audio_Codec_value: 1, label: 'AAC' },
          { Audio_Codec_value: 5, label: 'Disable' }
        ]
      }
}

const taskConfig_h265 = {
    //Video_Profile Main
      Video_Level:{
        "Main":[
          { Video_Level_value: 1, label: '3.1' },
          { Video_Level_value: 3, label: '4' },
          { Video_Level_value: 4, label: '4.1' },
          { Video_Level_value: 6, label: '5' },
          { Video_Level_value: 7, label: '5.1' },
          { Video_Level_value: 8, label: '5.2' },
          { Video_Level_value: 9, label: '6' },
          { Video_Level_value: 10, label: '6.1' },
          { Video_Level_value: 11, label: '6.2' }
        ]
      } ,
      Audio_Codec:{
        "File":[
          { Audio_Codec_value: 1, label: 'AAC' },
          { Audio_Codec_value: 2, label: 'MP3' },
          { Audio_Codec_value: 4, label: 'Copy' },
          { Audio_Codec_value: 5, label: 'Disable' }
        ],
        "Stream": [
          { Audio_Codec_value: 2, label: 'MP3' },
          { Audio_Codec_value: 5, label: 'Disable' }
        ]
      }
}

const taskConfig_vp8 = {
    Audio_Codec:{
      "File":[
        { Audio_Codec_value: 3, label: 'Vorbis' },
        { Audio_Codec_value: 5, label: 'Disable' }
      ],
      "Stream": [
        { Audio_Codec_value: 3, label: 'Vorbis' },
        { Audio_Codec_value: 5, label: 'Disable' }
      ]
    }
}

const taskConfig_vp9 = {
  Audio_Codec:{
    "File":[
    ],
    "Stream": [
    ]
  }
}
const taskConfig_mpeg2 = {
    Audio_Codec:{
      "File":[
        { Audio_Codec_value: 2, label: 'MP3' },
        { Audio_Codec_value: 5, label: 'Disable' }
      ],
      "Stream": [
        { Audio_Codec_value: 2, label: 'MP3' },
        { Audio_Codec_value: 5, label: 'Disable' }
      ]
    }
}
export const taskConfigVCodecUse=[
  { Video_Codec_value: 1, label: taskConfig_h264 },
  { Video_Codec_value: 2, label: taskConfig_h265 },
  { Video_Codec_value: 3, label: taskConfig_vp8 },
  { Video_Codec_value: 4, label: taskConfig_vp9 },
  { Video_Codec_value: 5, label: taskConfig_mpeg2 }
]
//vod file2stream h264/hevc/vp8/vp9
//live stream2stream h264/vp8
//file file2file h264/hevc/mpeg2/vp8

// H264
const taskConfig_rtmp =[
    { Task_Type_value: "vod", label:  {
        Video_Codec:[
          { Video_Codec_value: 1, label: 'H.264' }
        ]
      }
    },
    { Task_Type_value: "live", label:  {
        Video_Codec:[
          { Video_Codec_value: 1, label: 'H.264' }
        ]
      }
    }
]

// H264/H265
const taskConfig_hls_dash =[
    { Task_Type_value: "vod", label: {
        Video_Codec:[
          { Video_Codec_value: 1, label: 'H.264' }
        ]
      }
    },
    { Task_Type_value: "live", label: {
        Video_Codec:[
          { Video_Codec_value: 1, label: 'H.264' }
        ]
      }
    }
]

//VP8,VP9
const taskConfig_icecast =[
  { Task_Type_value: "vod", label: {
      Video_Codec:[
        { Video_Codec_value: 3, label: 'VP8' },
        { Video_Codec_value: 4, label: 'VP9' }
      ]
    }
  },
  { Task_Type_value: "live", label: {
      Video_Codec:[
        { Video_Codec_value: 3, label: 'VP8' }
      ]
    }
  }
]


export const taskConfigVStreamUse=[
  { Stream_Protocol_value: 0, label: taskConfig_rtmp },
  { Stream_Protocol_value: 1, label: taskConfig_hls_dash },
  { Stream_Protocol_value: 2, label: taskConfig_hls_dash },
  { Stream_Protocol_value: 3, label: taskConfig_icecast }
]



const taskConfig_filetype = {
  mkv:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  mp4:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  flv:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' }
    ]
  },
  f4v:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' }
    ]
  },
  avi:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  webm:{
    Video_Codec:[
      { Video_Codec_value: 3, label: 'VP8' },
      { Video_Codec_value: 4, label: 'VP9' }
    ]
  },
  mpeg:{
    Video_Codec:[
      { Video_Codec_value: 5, label: 'MPEG2' }
    ]
  },
  mov:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  mpg:{
    Video_Codec:[
      { Video_Codec_value: 5, label: 'MPEG2' }
    ]
  }
}
export const taskConfigVFileUse=[
  { File_Type_value: 0, label: taskConfig_filetype.mkv },
  { File_Type_value: 1, label: taskConfig_filetype.mp4 },
  { File_Type_value: 2, label: taskConfig_filetype.flv },
  { File_Type_value: 3, label: taskConfig_filetype.f4v },
  { File_Type_value: 4, label: taskConfig_filetype.avi },
  { File_Type_value: 5, label: taskConfig_filetype.webm },
  { File_Type_value: 6, label: taskConfig_filetype.mpeg },
  { File_Type_value: 7, label: taskConfig_filetype.mov },
  { File_Type_value: 8, label: taskConfig_filetype.mpg }
]

const taskConfig_filetype_quick = {
  mkv:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  mp4:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  flv:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' }
    ]
  },
  f4v:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' }
    ]
  },
  avi:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  webm:{
    Video_Codec:[
      { Video_Codec_value: 3, label: 'VP8' }
    ]
  },
  mpeg:{
    Video_Codec:[
      { Video_Codec_value: 5, label: 'MPEG2' }
    ]
  },
  mov:{
    Video_Codec:[
      { Video_Codec_value: 1, label: 'H.264' },
      { Video_Codec_value: 2, label: 'H.265' }
    ]
  },
  mpg:{
    Video_Codec:[
      { Video_Codec_value: 5, label: 'MPEG2' }
    ]
  }
}
export const taskConfigVFileUseQuick=[
  { File_Type_value: 0, label: taskConfig_filetype_quick.mkv },
  { File_Type_value: 1, label: taskConfig_filetype_quick.mp4 },
  { File_Type_value: 2, label: taskConfig_filetype_quick.flv },
  { File_Type_value: 3, label: taskConfig_filetype_quick.f4v },
  { File_Type_value: 4, label: taskConfig_filetype_quick.avi },
  { File_Type_value: 5, label: taskConfig_filetype_quick.webm },
  { File_Type_value: 6, label: taskConfig_filetype_quick.mpeg },
  { File_Type_value: 7, label: taskConfig_filetype_quick.mov },
  { File_Type_value: 8, label: taskConfig_filetype_quick.mpg }
]

export const taskConfigFileUseQuick=[
  { File_Type_value: 0, label: 'MKV' },
  { File_Type_value: 1, label: 'MP4' },
  { File_Type_value: 2, label: 'FLV' },
  { File_Type_value: 3, label: 'F4V' },
  { File_Type_value: 4, label: 'AVI' },
  { File_Type_value: 5, label: 'WEBM' },
  { File_Type_value: 6, label: 'MPEG' },
  { File_Type_value: 7, label: 'MOV' },
  { File_Type_value: 8, label: 'MPG' }
]
