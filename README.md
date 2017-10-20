# Mustang Web Application

The Mustang-200 Transcoding application handles all the features of Mustang-200. It was developed based on the Host API. So developers can refer to this application to call APIs
in their application. It is released under open source license, allowing users to modify it to meet their requirements.

The Transcoding Application is capable of handling multiple Mustang-200 cards. You can manage and monitor all of the cards using this application. Also you can navigate to the
Mustang-200 operating system named QTS by clicking the QTS icon in the application. QTS is a lightweight custom operation system developed by QNAP. 

The Transcoding Application is capable of VOD, Live and File scenarios. Each Transcoding scenario can be created using simple wizard steps. Each step is explained in detail 
in the application documentation.

Transcoding Application builds with Media Player to view the video when VOD and Live Job is running.

The IEI Transcoding application is developed based on React JS and Node JS Frameworks 


## Prerequisites

Install Mustang-200 Host Server SDK
   
## Installation guide:

##### 1. download source code from https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application on Github
##### 2. Download nodejs tool from https://nodejs.org/en/ and install nodejs
##### 3. Change to the Mustang-Video-Transcode-Web-Application directory and run the following command:npm install
         
             
##### 4. Run with Developer Mode (Developer PC)

	a. set file: "/src/js/config/appConfig.js" parameter: "const DebugUse=true;"
	    appConfigHead.HOST_API.host = host IP , appConfigHead.HOST_API.port = host port
	b. npm run dev
	c. open local web page: url is localhost:8080

##### 5. Run in host sever

       a. set file: "/src/js/config/appConfig.js" parameter: "const DebugUse=false;"
       b. npm run build_dev
       c. replace the application "/mustang-web-application-master/public" folder to Host SDK "/share/Public/mvt/public" folder.
       d. open host server web page: url is hostIP:hostPort


## Getting Started

The Mustang transcoding application has simple four pages. These pages provide your entire streaming application needs.

### Overview : 
  
 The whole picture of your transcoding system status is represented. It gives following status
1. Number of cards installed in your system.
2. Individual CPU and GPU usage.
3. System information (including Processor, RAM & IP Addresses).
4. Navigating to Individual CPUs. (Login to QTS OS)

![](https://raw.githubusercontent.com/IEI-dev/Mustang-Video-Transcode-Web-Application/master/src/readme_img/Overview.jpg)

### Port settings :
   
This page displays the network information regarding how the cards are connected to host system. It gives the following information
1. The CPU, MAC and IP Addresses
2. Port Information for QTS and Protocols HTTP,RTMP,ICECAST  

![](https://raw.githubusercontent.com/IEI-dev/Mustang-Video-Transcode-Web-Application/master/src/readme_img/network.jpg)

### Cards
 
 This page shows information about individual cards.
1. Card ID
2. CPUs and their information
3. CPU and GPU usage
4. Tasks and task status

![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Card.jpg)

### Settings
 
This is a sub item on the card page. When you want to add new tasks this wizard page will be displayed. A sequence of wizard steps shows settings for transcoding tasks. Once you select all the settings you can start your transcoding.
1. Select the task type
2. Transcoding settings (including Protocols, File type, Video & Audio Codec Information)
3. Output Information (including resolution)
4. Summary
   
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/settings.jpg)

### Logs

Log page contains history of information about the transcoding operations.History logs help you track and control the transcoding activities.It tracks high-level activities such as the start and completion of jobs and status changes.User can apply following filters to query the logs.
     
     1.Date
     2.Job Type
     3.Stuatus
     
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/log.jpg)     
     

## Examples
 
### VOD Transcoding 4K HEVC  to 4K H.264 Codec RTMP Streaming 
 
#### Click Add task on Card Page
     
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_1.jpg)
     
#### Select Task  
    
      1) Select Task Type as VOD

      2) Browse and Choose 4K input file. Once a file is selected it will display the file information.
      
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_2.jpg)
 
##### Transcoding settings
    
     3) Choose output streaming RTMP
     4) Video Codec: H.264 
     5) Profile: Main  
     6) Level: 4
     7) Audio Codec: AAC 
     8) Audio Bitrate: 128 Kbps
 
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_3.jpg)

#### Output Settings

       9) Select quality as QP  
          
    Select the number of outputs by adding the following settings:
                
      10) Resolution: 3840x2160 (4K) 
      11) Framerate: 30 
      12) QP Value : 23
        
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_4.jpg)

#### Summary

      13) The summary displays all the selected information. Transcoding will begin after clicking the start button
    
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_5.jpg)
    
#### Task Info & Preview

![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_6.jpg)
    
      14) The transcoding Task is added to the list. You can view task information by clicking the view icon. 
    
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex1_7.jpg)
    
      15)Preview in media Player
    
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ext1_8.jpg)
       

###  FILE Transcoding H.264 4K to 4K H.265(HEVC) Codec       
    
#### Click Add task on Card Page
     
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_1.jpg)

#### Select Task  
    
    1) Select "File" as the Task Type.
    2) Enable "Quick Transcode" to complete transcoding process quicker. Quick Transcode uses maximum GPU resources to transcode faster.  
    3) Browse and choose a 4K input file. Once a file is selected, its information will be displayed.

![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_2.jpg)

### Transcoding settings

     4) Choose output File Format MKV
     5) Video Codec: H.265 
     6) Profile: Main  
     7) Level: 6.2
     8) Audio Codec: AAC 
     9) Audio Bitrate: 128 Kbps
 
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_3.jpg)
   
   
#### Output Settings

    10) Select quality as QP 
          
    Select the number of outputs by adding the following settings
            
    11) Resolution: 3840x2160(4K) 
    12) Framerate: 30 
    13) QP Value: 23
        
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_4.jpg)
    
#### Summary

   14)  The summary displays all the selected information. Transcoding will begin after clicking the start button
    
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_5.jpg)
    
#### Task Info 

      
   15) The transcoding Task is added to the list. You can view task information by clicking the view icon. 
    
![](https://github.com/IEI-dev/Mustang-Video-Transcode-Web-Application/blob/master/src/readme_img/Ex2_6.jpg)
