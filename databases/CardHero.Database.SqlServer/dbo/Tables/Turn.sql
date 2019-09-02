CREATE TABLE [dbo].[Turn] (
    [Turn_PK]        INT           IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]       ROWVERSION    NOT NULL,
    [StartTime]      DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [EndTime]        DATETIME2 (7) NULL,
    [CurrentUser_FK] INT           NOT NULL,
    [Game_FK]        INT           NOT NULL,
    CONSTRAINT [PK_Turn] PRIMARY KEY CLUSTERED ([Turn_PK] ASC),
    CONSTRAINT [FK_Turn_CurrentUser_FK] FOREIGN KEY ([CurrentUser_FK]) REFERENCES [dbo].[User] ([User_PK]),
    CONSTRAINT [FK_Turn_Game_FK] FOREIGN KEY ([Game_FK]) REFERENCES [dbo].[Game] ([Game_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Turn_CurrentUser_FK]
    ON [dbo].[Turn]([CurrentUser_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Turn_Game_FK]
    ON [dbo].[Turn]([Game_FK] ASC);

