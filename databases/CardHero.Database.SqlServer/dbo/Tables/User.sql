CREATE TABLE [dbo].[User] (
    [User_PK]     INT            IDENTITY (1, 1) NOT NULL,
    [Identifier]  NVARCHAR (50)  NOT NULL,
    [CreatedDate] DATETIME2 (7)  DEFAULT (getdate()) NOT NULL,
    [FullName]    NVARCHAR (200) NULL,
    [IdPSource]   NVARCHAR (50)  NOT NULL,
    [Coins]       BIGINT         DEFAULT (0) NOT NULL, 
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([User_PK] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_User_Identifier]
    ON [dbo].[User]([Identifier] ASC, [IdPSource] ASC);

