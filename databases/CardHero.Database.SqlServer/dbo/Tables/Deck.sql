CREATE TABLE [dbo].[Deck] (
    [Deck_PK]     INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION      NULL,
    [CreatedTime] DATETIME2 (7)   DEFAULT (getdate()) NOT NULL,
    [UpdatedTime] DATETIME2 (7)   NULL,
    [Name]        NVARCHAR (100)  NOT NULL,
    [Description] NVARCHAR (1000) NULL,
    [MaxCards]    INT             NOT NULL,
    [User_FK]     INT             NOT NULL,
    CONSTRAINT [PK_Deck] PRIMARY KEY CLUSTERED ([Deck_PK] ASC),
    CONSTRAINT [CK_Deck_MaxCards] CHECK ([MaxCards]>(0)),
    CONSTRAINT [FK_Deck_User_FK] FOREIGN KEY ([User_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Deck_User_FK]
    ON [dbo].[Deck]([User_FK] ASC);

